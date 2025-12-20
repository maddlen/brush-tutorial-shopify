import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

Alpine.plugin(persist);

type PersistorState = Record<string, any>;
type ChangeListener = (key: string, value: any) => void;

class Persistor {
  storage: Storage;
  state: PersistorState;
  private listeners: Set<ChangeListener>;

  constructor(storageType: "local" | "session" = "local") {
    this.storage = storageType === "session" ? sessionStorage : localStorage;
    this.state = Alpine.reactive({});
    this.listeners = new Set();
    this.listenForTabChanges();
  }

  private _save(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
    this.state[key] = value;
    this._notify(key, value);
  }

  private _load(key: string, fallback?: any) {
    const raw = this.storage.getItem(key);
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);

      // Ignore Alpine internal wrapper objects
      if (parsed && typeof parsed === "object" && "_x_interceptor" in parsed) {
        return fallback;
      }
      return parsed;
    } catch {
      return fallback;
    }
  }

  private _notify(key: string, value: any) {
    this.listeners.forEach((fn) => fn(key, value));
  }

  // Public API
  initStore(name: string, defaults: Record<string, any>) {
    const store: Record<string, any> = {};

    for (const [k, v] of Object.entries(defaults)) {
      const fullKey = `${name}.${k}`;
      const rawValue = this._load(fullKey, v);

      // Assign persisted proxy directly to Alpine store key
      store[k] = Alpine.$persist(rawValue).using(this.storage).as(fullKey);

      // Sync plain value into persistor.state for external reads
      Alpine.effect(() => {
        const newVal = store[k];
        const plainVal = JSON.parse(JSON.stringify(newVal));
        this.state[fullKey] = plainVal;
      });
    }

    Alpine.store(name, store);
    return store;
  }

  get(key: string): any {
    return this.state[key] ?? this._load(key);
  }

  set(key: string, value: any) {
    this._save(key, value);
  }

  clear(key: string) {
    delete this.state[key];
    this.storage.removeItem(key);
    this._notify(key, undefined);
  }

  clearAll(prefix: string = "") {
    Object.keys(this.storage).forEach((k) => {
      if (!prefix || k.startsWith(prefix)) {
        this.clear(k);
      }
    });
  }

  use(storageType: "local" | "session") {
    this.storage = storageType === "session" ? sessionStorage : localStorage;
  }

  onChange(fn: ChangeListener) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private listenForTabChanges() {
    window.addEventListener("storage", (e: StorageEvent) => {
      if (!e.key || !e.newValue) return;
  
      try {
        const val = JSON.parse(e.newValue);
        if (val && typeof val === "object" && "_x_interceptor" in val) return;
  
        // Update persistor.state
        this.state[e.key] = val;
        this._notify(e.key, val);
  
        // Update Alpine store if it exists
        const [storeName, key] = e.key.split(".");
        const alpineStore = Alpine.store(storeName) as Record<string, any>;
  
        if (alpineStore && key) {
          const current = alpineStore[key];
          if (current && typeof current === 'object' && '_x_type' in current) {
            // $persist proxy
            current.value = val;
          } else {
            // fallback for plain values
            alpineStore[key] = val;
          }
        }
      } catch {}
    });
  }
  
}

export default new Persistor();

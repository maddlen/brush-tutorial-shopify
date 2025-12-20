import Alpine from "alpinejs";
import Brush from "../_brush";
import { registerAlpineComponents } from "./components";
import { registerAlpineStores } from "./stores";

(async () => {
  window.Brush = Brush;
  await Brush.start();

  window.Alpine = Alpine;
  registerAlpineStores();
  registerAlpineComponents();
  Alpine.start();
})();

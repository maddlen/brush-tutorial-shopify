export type ValidationErrors = Record<string, string[]>;

class FormValidator {
  constructor(private readonly container: HTMLElement) {}

  clearErrors(): void {
    this.container.querySelectorAll("[validator-error]").forEach((el) => el.remove());
  }

  showErrors(errors: ValidationErrors): void {
    const fragment = document.createDocumentFragment();

    for (const [field, [message]] of Object.entries(errors)) {
      const input = this.container.querySelector<HTMLElement>(`[validator-field="${field}"]`);
      if (!input) continue;

      const error = document.createElement("span");
      error.textContent = $t(message);
      error.setAttribute("validator-error", "");
      input.insertAdjacentElement("afterend", error);
    }

    // Using a DocumentFragment ensures future scalability if you ever need bulk insertions.
    this.container.appendChild(fragment);
  }
}

export default {
  Validator: FormValidator,
};

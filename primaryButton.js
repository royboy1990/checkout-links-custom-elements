class PrimaryButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Create shadow DOM for styling isolation
    }

    connectedCallback() {
        // Add button and style to shadow DOM
        const button = document.createElement("button");
        button.textContent = this.getAttribute("label") || "Click Me!";
        button.style.cssText = `
      background-color: #0078d7;
      color: white;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    `;

        button.addEventListener("click", () => {
            alert("Button Clicked!");
        });

        const style = document.createElement("style");
        style.textContent = `
      button:hover {
        background-color: #005fa3;
      }
    `;

        this.appendChild(style);
        this.appendChild(button); // Attach to "this" instead of shadow DOM
    }
}

// Register the custom element
customElements.define("primary-button", PrimaryButton);

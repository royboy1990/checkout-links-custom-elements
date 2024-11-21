class PrimaryButton extends HTMLElement {
    connectedCallback() {
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
        button.addEventListener("click", () => alert("Button Clicked!"));
        this.appendChild(button);
    }
}
customElements.define("primary-button", PrimaryButton);

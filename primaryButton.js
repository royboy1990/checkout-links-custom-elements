import { generateCheckoutLink } from "https://<your-backend-script-url>.js";

class PrimaryButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" }); // Shadow DOM for isolation
    }

    connectedCallback() {
        // Create the button
        const button = document.createElement("button");
        button.textContent = this.getAttribute("label") || "Generate Checkout Link";
        button.style.cssText = `
            background-color: #0078d7;
            color: white;
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        `;

        // Add an element to display the checkout link
        const linkDisplay = document.createElement("div");
        linkDisplay.style.marginTop = "10px";
        linkDisplay.style.fontSize = "14px";
        linkDisplay.style.color = "#333";

        // Attach click event to the button
        button.addEventListener("click", async () => {
            try {
                const productIds = this.getAttribute("productIds")?.split(",") || [];
                if (!productIds.length) {
                    linkDisplay.textContent = "No products selected!";
                    return;
                }

                // Call the backend function
                const checkoutUrl = await generateCheckoutLink(productIds);
                linkDisplay.innerHTML = `<strong>Checkout Link:</strong> <a href="${checkoutUrl}" target="_blank">${checkoutUrl}</a>`;
            } catch (error) {
                console.error("Error generating checkout link:", error.message);
                linkDisplay.textContent = "Error generating checkout link. Check console for details.";
            }
        });

        // Append button and link display to the custom element
        this.shadowRoot.appendChild(button);
        this.shadowRoot.appendChild(linkDisplay);
    }
}

// Define the custom element
customElements.define("primary-button", PrimaryButton);

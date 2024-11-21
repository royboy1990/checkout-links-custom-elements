class PrimaryButton extends HTMLElement {
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

                // Call the backend function (adjust the name/path as needed)
                const checkoutUrl = await fetch("/_functions/generateCheckoutLink", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productIds }),
                }).then((res) => res.json());

                linkDisplay.innerHTML = `<strong>Checkout Link:</strong> <a href="${checkoutUrl}" target="_blank">${checkoutUrl}</a>`;
            } catch (error) {
                console.error("Error generating checkout link:", error.message);
                linkDisplay.textContent = "Error generating checkout link. Check console for details.";
            }
        });

        // Append button and link display to the custom element
        this.appendChild(button);
        this.appendChild(linkDisplay);
    }
}

// Define the custom element
customElements.define("primary-button", PrimaryButton);

// Select all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    // Add an event listener for the "click" event
    button.addEventListener("click", () => {
        alert("Item added to cart!");
    });
});

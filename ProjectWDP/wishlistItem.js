const wishlistItemForm = document.getElementById("wishlistItemForm");
if (wishlistItemForm) {
    wishlistItemForm.addEventListener("submit", addWishlistItem);
}

function addWishlistItem(event) {
    event.preventDefault();

    const wishlistItem = {
        itemName: document.getElementById("itemName").value,
        itemDescription: document.getElementById("itemDescription").value,
        itemPrice: document.getElementById("itemPrice").value,
        itemUrl: document.getElementById("itemUrl").value
    };

    console.log(wishlistItem);
}

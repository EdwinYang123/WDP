import { fetchData, getCurrentUser } from './main.js';

// ===== Page protection =====
// If no user is logged in, redirect them to the login page
const currentUser = getCurrentUser();
if (!currentUser) {
    window.location.href = "login.html";
}

// ===== Wishlist Form =====
const wishlistForm = document.getElementById("wishlistForm");
if (wishlistForm) {
    wishlistForm.addEventListener("submit", createWishlist);
}

function createWishlist(event) {
    event.preventDefault();

    const user = getCurrentUser();
    if (!user) {
        alert("You must be logged in to create a wishlist!");
        window.location.href = "login.html";
        return;
    }

    const wishlist = {
        wishlistName: document.getElementById("wishlistName").value,
        wishlistDescription: document.getElementById("wishlistDescription").value,
        dateCreated: new Date().toISOString().split('T')[0], // YYYY-MM-DD format for MySQL DATE
        userId: user.userId
    };

    fetchData('/wishlist/createWishlist', wishlist, 'POST')
        .then(data => {
            alert("Wishlist created successfully!");
            wishlistForm.reset();
        })
        .catch(err => {
            alert(err.message);
        });
}

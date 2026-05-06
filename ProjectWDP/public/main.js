// Generic fetch helper for POST, PUT, DELETE requests
async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(route, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw await response.json();
    }
}

// Save the logged-in user to localStorage
function setCurrentUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Retrieve the currently logged-in user from localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

// Remove the user from localStorage (logout)
function removeCurrentUser() {
    localStorage.removeItem('user');
}

export { fetchData, setCurrentUser, getCurrentUser, removeCurrentUser };

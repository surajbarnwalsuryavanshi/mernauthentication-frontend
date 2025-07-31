import cookie from "js-cookie";

// Set a cookie
export const setCookie = (key, value, expires = 1) => {
    if (typeof window !== "undefined") {
        cookie.set(key, value, { expires });
    }
};

// Remove a cookie
export const removeCookie = (key) => {
    if (typeof window !== "undefined") {
        cookie.remove(key); // ✅ Fixed: Use `remove` instead of `set`
    }
};

// Get a cookie value
export const getCookie = (key) => {
    if (typeof window !== "undefined") {
        return cookie.get(key);
    }
    return null;
};

// Set item in localStorage
export const setLocalStorage = (key, value) => {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("Error setting localStorage:", error);
        }
    }
};

// Remove item from localStorage
export const removeLocalStorage = (key) => {
    if (typeof window !== "undefined") {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing localStorage:", error);
        }
    }
};

// Authenticate user by storing token in cookies and user data in localStorage
export const authenticate = (response, next) => {
    console.log("AUTHENTICATE HELPER ON SIGNIN RESPONSE", response);
    setCookie("token", response.data.token);
    setLocalStorage("user", response.data.user);
    if (next) next();
};

// Get authenticated user from localStorage
export const isAuth = () => {
    if (typeof window !== "undefined") {
        const token = getCookie("token");
        if (token) {
            const user = localStorage.getItem("user");
            return user ? JSON.parse(user) : false;
        }
    }
    return false;
};

// Sign out user by removing cookie and localStorage data
export const signout = (next) => {
    removeCookie("token");
    removeLocalStorage("user");
    if (next) next();
};


export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response);
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = response.data;
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
}

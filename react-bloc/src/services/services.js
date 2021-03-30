import { User } from "../models/User";


const localStorageKey = 'token';

const login = async (email, password) => {
    // login logic
    const response = { status: 200, data: { 'key': 'AUTH_KEY' } }

    if (response.status === 200) {
        window.localStorage.setItem(localStorageKey, response.data['key'])
    }
    return response;
}

const getCurrentUser = async () => {
    // some logic
    return new User('admin@gmail.com', 'admin')
}

const logout = async () => {
    removeToken();
}

const getToken = async () => {
    return window.localStorage.getItem(localStorageKey);
}

const removeToken = async () => {
    return window.localStorage.removeItem(localStorageKey);
}

const register = async (email, username, password, reppassword) => {
    // register logic
    let response = { status: 200 }
    return response
}

export { register, login, logout, getToken, removeToken, getCurrentUser }
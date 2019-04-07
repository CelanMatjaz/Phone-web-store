const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

export const login = token => ({
    type: LOGIN,
    token
});

export const logout = () => ({
    type: LOGOUT
});

export default {
    LOGIN,
    LOGOUT
}
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const LOGIN_CHECK_SUCCESS = 'LOGIN_CHECK_SUCCESS';
const LOGIN_CHECK_FAILURE = 'LOGIN_CHECK_FAILURE';

export const login = token => ({
    type: LOGIN,
    token
});

export const logout = () => ({
    type: LOGOUT
});

export const loginCheckSuccess = token => ({
    type: LOGIN_CHECK_SUCCESS,
    token
});

export const loginCheckFailure = () => ({
    type: LOGIN_CHECK_FAILURE
});

export default {
    LOGIN,
    LOGOUT,
    LOGIN_CHECK_SUCCESS,
    LOGIN_CHECK_FAILURE
}
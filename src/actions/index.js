import axios from 'axios';
import {browserHistory} from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}) {
    return function(dispatch, getState) {
        // Submit data to the server
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(response => {
                // If success - update state; save jwt; redirect to /feature
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(() => {
                // If error - show an error
                dispatch(authError('Bad Login Info'));
            });

    };
}

export function signupUser({email, password}) {
    return function(dispatch, getState) {
        // Submit data to the server
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response => {
                // If success - update state; save jwt; redirect to /feature
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(({response}) => {
                // If error - show an error
                dispatch(authError(response.data.error));
            });

    };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

export function fetchMessage() {
    return function(dispatch) {
        axios
            .get(ROOT_URL, {
                headers: {authorization: localStorage.getItem('token')}
            })
            .then(response => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
            });
    }
}
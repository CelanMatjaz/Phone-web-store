import constants from '../constants/constants.auth';
import jwt from 'jsonwebtoken';

const initState = {
    userInfo: {},
    isEmpty: true
}

const authReducer = (state = initState, action) => {
	switch(action.type){
		case constants.LOGIN:
			let userInfo = jwt.decode(action.token);
			localStorage.setItem('token', action.token);
			return {
				...state,
				userInfo,
				isEmpty: false
			}
		case constants.LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				userInfo: {},
				isEmpty: true
			}	
		default: 
			return state;
	}
}

export default authReducer;
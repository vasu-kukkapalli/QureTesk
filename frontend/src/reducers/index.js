import { USER_LOGIN, USER_SIGNUP } from '../actions/index'

const initialState = {
    // buttonName: {},
    userLoginData: {},
    userSignupData: {},
    // loader: true
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return { ...state, userLoginData: action.payload }
        case USER_SIGNUP:
            return { ...state, userSignupData: action.payload }
        default:
            return state
    }
}

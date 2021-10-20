const stateDef = {
    user: '',
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    hasAccount: false
}
export const loginReducer = (state = stateDef, action) =>{
    switch (action.type){
        case "SET_USER":
            return {...state, user: action.newUser}
        case "SET_EMAIL":
            return {...state, email: action.newEmail}
        case "SET_PASSWORD":
            return {...state, password: action.newPassword}
        case "SET_EmailError":
            return {...state, emailError: action.newEmailError}
        case "SET_PasswordError":
            return {...state, passwordError: action.newPasswordError}
        case "SET_HasAccount":
            return {...state, hasAccount: action.newHasAccount}
        default:
            return state;
    }
}
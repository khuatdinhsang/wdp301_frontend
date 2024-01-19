export const loginAccount = (account) => {
    return {
        type: "LOGIN",
        payload: account
    }
}

export const logoutAccount = (account) => {
    return{
        type: "LOGOUT",
        payload: account
    }
}
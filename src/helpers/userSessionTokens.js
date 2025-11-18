export const getUserInfo = ()=>{
    return localStorage.getItem("user");
}

export const getSessionToken = ()=>{
    return localStorage.getItem("login_token");
}
export const getUserInfo = ()=>{
    return localStorage.getItem("user");
}

export const getSessionToken = ()=>{
    return localStorage.getItem("login_token");
}

export const removeLoginToken = ()=>{
    return localStorage.removeItem("login_token");
}

export const removeUserInfo = ()=>{
    localStorage.removeItem("user");
}
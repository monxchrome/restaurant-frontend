const accessToken =  'accessToken'

const authService = {
    getAccessToken: () => localStorage.getItem(accessToken),
    isAuth: () => !! localStorage.getItem(accessToken)
}

export {
    authService
}
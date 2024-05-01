const parseJwt = (token: string | null) => {
    if (token) return JSON.parse(atob(token.split('.')[1]));
};

export const AuthVerify = async () => {
    const accessToken = (await localStorage.getItem('accessToken')) as string;
    if (!accessToken) {
        return 'None Access Token';
    } else {
        const decodedAccess = parseJwt(accessToken);
        if (decodedAccess.exp * 1000 < Date.now()) {
            return 'Access Token Expired';
        }
    }
    return true;
};

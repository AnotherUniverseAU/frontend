const parseJwt = (token: string | null) => {
  if (token) return JSON.parse(atob(token.split(".")[1]));
};

export const AuthVerify = () => {
  const accessToken = localStorage.getItem("accessToken");
  const decodedAccess = parseJwt(accessToken);

  if (decodedAccess.exp * 1000 < Date.now()) {
    return "Access Token Expired";
  }

  return true;
};

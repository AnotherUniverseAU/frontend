import { getCookie } from "src/hooks/cookie";

const parseJwt = (token: string | null) => {
  if (token) return JSON.parse(atob(token.split(".")[1]));
};

export const AuthVerify = () => {
  const accessToken = getCookie("accessToken");
  const decodedAccess = parseJwt(accessToken);
  if (accessToken === null || undefined) {
    return "None Access Token";
  } else if (decodedAccess.exp * 1000 < Date.now()) {
    return "Access Token Expired";
  }
  return true;
};

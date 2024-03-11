import { jwtDecode } from "jwt-decode";

export const isJWTExpired = (jwt) => {
  const decoded = jwtDecode(jwt);

  const isExipred = Date.now() >= decoded.exp * 1000;

  return isExipred;
};

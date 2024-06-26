import jwtDecode from "jwt-decode";

type DecodeFunction = {
    id: string;
    email: string;
    roles: string;
};

export const decodeJwt = (accessToken: string) => {
    const decoded: DecodeFunction = jwtDecode(accessToken);
    return decoded;
}
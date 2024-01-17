import jwtDecode from "jwt-decode";

type DecodeFunction = {
    id: number;
    email: string;
};

export const decodeJwt = (accessToken: string) => {
    const decoded: DecodeFunction = jwtDecode(accessToken);
    return decoded;
}
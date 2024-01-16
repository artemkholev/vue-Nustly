import jwtDecode from "jwt-decode";

type DescribableFunction = {
    id: number;
    email: string;
};

export const decodeJwt = (accessToken: string) => {
    const decoded: DescribableFunction = jwtDecode(accessToken);
    return decoded;
}
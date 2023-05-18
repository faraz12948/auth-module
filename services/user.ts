import { getUserFromEmail, getUserFromUsername, loginRepo, registerRepo, updateUserRepo } from "../repositories/user";


export const registerUser = async (username: string, email: string, password: string, isAdmin: boolean, tkn: string) => {
    return await registerRepo({
        username,
        email,
        password,
        isAdmin,
        tkn
    });
};
export const loginUser = async (username: string, password: string) => {
    return await loginRepo({
        username,
        password
    });
};
export const updateUser = async (username: string, email: string, password: string) => {
    return await updateUserRepo({
        username,
        email,
        password
    });
};

export const getUserByEmail = async (email: any) => {

    return await getUserFromEmail(email);
};
export const getUserByUsername = async (username: any) => {
    return await getUserFromUsername(username);
};

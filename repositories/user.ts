import pool from "../configs/dbConfig";
import bcrypt from "bcrypt";
import { signUpType, signInType, commonAuthType } from "../interfaces/user";

export const registerRepo = async (data: signUpType) => {
    const {
        username,
        email,
        password,
        isAdmin,
        tkn
    } = data
    const salt = await bcrypt.genSalt(10)
    let encryptedPassword = await bcrypt.hash(password, salt)
    const userInfo = [username, email, encryptedPassword, isAdmin, tkn];
    const query = {
        text: `INSERT INTO users(
    username,
    email,
    password,
    is_admin,
    token
  ) VALUES($1, $2, $3, $4, $5) RETURNING id, email`,
        values: userInfo
    };
    const user = await pool.query(query)
    return user;

}
export const loginRepo = async (data: signInType) => {
    const {
        username

    } = data
    const query = {
        text: 'SELECT username, email, password FROM users WHERE username = $1',
        values: [username]
    };
    const users = await pool.query(query);

    return users;

}
export const updateUserRepo = async (data: commonAuthType) => {
    const {
        username,
        email,
        password,
    } = data
    const salt = await bcrypt.genSalt(10)
    let updatedPassword = password ? await bcrypt.hash(password, salt) : ''
    const query = `UPDATE users SET username = '${username}' ${updatedPassword ? `,password = '${updatedPassword}'` : ''}
                    where email = '${email}' RETURNING name, email`;
    return await pool.query(query)
}

export const deleteUser = async (id: any) => {
    const query = `DELETE FROM users WHERE id='${id}'`;
    await pool.query(query);
}
export const updateTokenRepo = async (data: commonAuthType) => {

    const query = `UPDATE users SET token = '${data.tkn}' WHERE username='${data.username}' RETURNING token`;
    const user = await pool.query(query)
    return user;

}
export const getTokenRepo = async (data: commonAuthType) => {

    const query = `SELECT token FROM users WHERE username='${data}'`;
    const token = await pool.query(query);

    return token;

}
export const getUserFromEmail = async (data: commonAuthType) => {
    const query = `SELECT username,email FROM users WHERE email='${data}'`
    return await pool.query(query)
}
export const getUserFromUsername = async (data: commonAuthType) => {
    const query = `SELECT username,email FROM users WHERE username='${data}'`
    return await pool.query(query)
}

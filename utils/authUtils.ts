import jwt from 'jsonwebtoken'
import { JwtPayload } from 'jsonwebtoken';
import { RequestWithUser, RequestWithToken, commonAuthType } from '../interfaces/user';
import { getUserFromEmail } from '../repositories/user';
import crypto from 'crypto';
const { ACCESS_TOKEN_SECRET } = process.env;
const generateToken = (username: any, email: any) => {
    let data = {
        username,
        email
    }
    return jwt.sign(data, ACCESS_TOKEN_SECRET as string, {
        expiresIn: '60d'
    })
}
export async function verifyToken(req: RequestWithToken, ACCESS_TOKEN_SECRET: string) {
    let token;
    if (checkAuthHeader(req)) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload;
            return { token, decoded };
        } catch (e: any) {
            console.error(e);
            throw new Error(e.message || 'Authorization failed');
        }
    }
    throw new Error('not authorized');
}
export function verfiyTokenDate(token: any) {
    try {
        const decodedToken: any = jwt.verify(token, ACCESS_TOKEN_SECRET as string);
        if (decodedToken.exp > Date.now() / 1000) {
            // check if the token has expired
            return true;
        }
    } catch (e: any) {

        return false;
    }
}

export function checkAuthHeader(req: RequestWithToken) {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        return true;

    }
    return false;
}
export async function verifyJwtuser(req: RequestWithToken, ACCESS_TOKEN_SECRET: any) {

    const token = req.headers.authorization.split(' ')[1]
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET)

    const users = await getUserFromEmail(decoded.email);
    if (users.rows.length) {

        req.user = users.rows[0];
        return true;

    }
    return false;

}
interface TimeoutConfig {
    [role: string]: {
        [key: string]:number;
    };
  }
  
export function calculateTimeoutBasedOnRoleAndFunction(role:string, func:string) {
    // Define timeout values based on role and function
    const timeouts: TimeoutConfig = {
      admin: {
        manage: 3600000, // 1 hour in milliseconds
        view: 1800000,   // 30 minutes in milliseconds
      },
      user: {
        manage: 1800000, // 30 minutes in milliseconds
        view: 900000,    // 15 minutes in milliseconds
      },
    };
  
    // Get the corresponding timeout based on role and function
    const timeoutForRole = timeouts[role] ? timeouts[role][func] : 900000; // Default to 15 minutes
  
    return timeoutForRole;
  }

export function generateSessionId() {
  const sessionId = crypto.randomBytes(32).toString('hex'); // Generate a 64-character random string
  console.log(sessionId);
  return sessionId;
}

  

export default generateToken;


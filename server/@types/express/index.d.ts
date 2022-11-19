declare namespace Express {
  export interface Request {
    user: {
      name?: string;
      iss: string;
      aud: string;
      auth_time: number;
      user_id?: string;
      sub: string;
      iat: number;
      exp: number;
      email?: string;
      email_verified?: boolean;
      uid: string;
    };
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_URI: string;
    PORT: number;
  }
}

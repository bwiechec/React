import { sign } from "jsonwebtoken";
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

export const createAccessToken = (userId: number) => {
  return sign({ userId: userId }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
};

export const createRefreshToken = (userId: number) => {
  return sign(
    { userId: userId },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: "7d"
    }
  );
};
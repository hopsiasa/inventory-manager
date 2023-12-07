import jwt, { Secret, SignOptions, VerifyOptions } from "jsonwebtoken";

export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;
export const JWT_EXPIRES_IN = "2d"; // 2 days

export const sign = (payload: Record<string, any>, privateKey: Secret, options: SignOptions): string => {
  const token = jwt.sign(payload, privateKey, options);
  return token;
};

export const decode = (token: string, privateKey: Secret): Record<string, any> => {
  try {
    const decoded = jwt.verify(token, privateKey, { algorithms: ["HS256"] } as VerifyOptions) as Record<string, any>;

    return decoded;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid token");
  }
};

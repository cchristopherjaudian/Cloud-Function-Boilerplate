import jwt from "jsonwebtoken";
import { TVerifiedToken } from "../types/jwt";

class JwtToken {
  private static _instance: JwtToken;
  private _tokenSecret = String(process.env.TOKEN_SECRET);

  public static get instance(): JwtToken {
    this._instance = this._instance || new JwtToken();
    return this._instance;
  }

  public sign(payload: Record<string, any>): Promise<string | unknown> {
    return new Promise((resolve, reject) => {
      return jwt.sign(
        payload,
        this._tokenSecret,
        {
          expiresIn: "1d",
        },
        function (err, token) {
          return err ? reject(err) : resolve(token as string);
        }
      );
    });
  }

  public verify(token: string): Promise<TVerifiedToken> {
    return new Promise((resolve, reject) => {
      return jwt.verify(token, this._tokenSecret, (err, decoded) => {
        return err ? reject(err) : resolve(decoded as TVerifiedToken);
      });
    });
  }
}

export default JwtToken;

import { auth } from "firebase-admin";

class FirebaseAuth {
  private static _instance: FirebaseAuth;

  public static get instance(): FirebaseAuth {
    this._instance = this._instance || new FirebaseAuth();
    return this._instance;
  }

  public async verifyToken(token: string) {
    return auth().verifyIdToken(token);
  }
}

export default FirebaseAuth;

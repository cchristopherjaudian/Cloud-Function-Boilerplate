import { initializeApp } from 'firebase-admin/app';
import * as firestoreDb from 'firebase-admin/firestore';

export interface IFirestore {
  getDb: () => firestoreDb.Firestore;
}

export type TDocRef = firestoreDb.DocumentReference;
export type TDocSnapshot = firestoreDb.DocumentSnapshot;
export type TDocData = firestoreDb.DocumentData;
export type TDocumentData =
  FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

class Firestore implements IFirestore {
  private static _instance: Firestore;
  private _app;
  private _colName: string = '';
  private _docId: string = '';

  private constructor() {
    this._app = initializeApp();
  }

  public static getInstance(): Firestore {
    Firestore._instance = Firestore._instance || new Firestore();
    return Firestore._instance;
  }

  public getDb() {
    return firestoreDb.getFirestore(this._app);
  }

  public setCollectionName(colName: string) {
    this._colName = colName;
    return this;
  }

  public setDocId(id: string) {
    this._docId = id;
    return this;
  }

  public async create<T>(payload: Record<string, any>): Promise<T> {
    try {
      await this.getDb()
        .collection(this._colName)
        .doc(this._docId)
        .set(payload);

      return payload as T;
    } catch (error) {
      throw error;
    }
  }

  public async update<T>(payload: Record<string, any>): Promise<T> {
    try {
      await this.getDb()
        .collection(this._colName)
        .doc(this._docId)
        .update(payload);

      return payload as T;
    } catch (error) {
      throw error;
    }
  }

  public async findById<T>(id: string): Promise<T | null> {
    try {
      const ref = await this.getDb().collection(this._colName).doc(id).get();

      return (ref.data() as T) || null;
    } catch (error) {
      throw error;
    }
  }

  public async delete(): Promise<void> {
    try {
      await this.getDb().collection(this._colName).doc(this._docId).delete();
    } catch (error) {
      throw error;
    }
  }
}

export default Firestore;

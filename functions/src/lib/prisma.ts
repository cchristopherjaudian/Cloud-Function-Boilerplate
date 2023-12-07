import { PrismaClient } from "@prisma/client";
import {
  DefaultArgs,
  PrismaClientOptions,
} from "@prisma/client/runtime/library";

class Prisma {
  private static _prisma: Prisma;
  private _app: PrismaClient;

  private constructor() {
    this._app = new PrismaClient();
  }

  public static get Instance(): Prisma {
    this._prisma = this._prisma || new Prisma();
    return this._prisma;
  }

  public get db(): PrismaClient<PrismaClientOptions, never, DefaultArgs> {
    return this._app;
  }
}

export type TPrismaClient = typeof Prisma.Instance.db;

export default Prisma;

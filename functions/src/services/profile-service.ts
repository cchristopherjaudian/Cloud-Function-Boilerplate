import * as bcrypt from "bcrypt";
import { BadRequestError } from "../lib/custom-errors/class-errors";
import { TPrismaClient } from "../lib/prisma";
import { TCreateFullProfile } from "../types/account-profile";

class AccountProfileService {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async create(payload: TCreateFullProfile) {
    const { account, ...profile } = payload;
    const userExists = await this._db.account.findFirst({
      where: {
        username: account.username,
      },
    });
    if (userExists) throw new BadRequestError("Wrong username or password.");

    account.password = await bcrypt.hashSync(account.password, 10);
    return this._db.account.create({
      data: {
        ...account,
        profile: {
          create: {
            ...profile,
          },
        },
      },
    });
  }
}

class ProfileService {
  private _db: TPrismaClient;

  constructor(db: TPrismaClient) {
    this._db = db;
  }

  public async getProfile(id: string) {
    const profile = await this._db.profile.findUnique({
      where: { id },
      include: {
        account: true,
      },
    });
    if (!profile) throw new BadRequestError("Profile does not exists.");
    return profile;
  }
}

export { AccountProfileService, ProfileService };

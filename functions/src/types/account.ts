import { Account } from "@prisma/client";

export type TAccount = Account;

export type TAccountWithoutBase = Pick<TAccount, "username" | "password">;

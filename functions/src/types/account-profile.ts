import { TAccountWithoutBase } from "./account";
import { TProfileWithoutBase } from "./profile";

export type TCreateFullProfile = TProfileWithoutBase & {
  account: TAccountWithoutBase;
};

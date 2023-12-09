import { Profile } from "@prisma/client";

export type TProfile = Profile;

export type TProfileWithoutBase = Omit<
  TProfile,
  "id" | "createdAt" | "updatedAt"
>;

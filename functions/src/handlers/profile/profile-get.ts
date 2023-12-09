import httpStatus from "http-status";
import catchAsync from "../../lib/helpers/catch-async";
import ResponseObject from "../../lib/helpers/response-object";
import ResponseCodes from "../../../commons/response-codes";
import { ProfileService } from "../../services/profile-service";
import Prisma from "../../lib/prisma";

const db = Prisma.Instance.db;
const profile = new ProfileService(Prisma.Instance.db);

export default catchAsync(async (req, res) => {
  const profileData = await profile.getProfile(req.params.profileId);
  await db.$disconnect();
  ResponseObject(res, httpStatus.OK, ResponseCodes.DATA_RETRIEVED, profileData);
});

import httpStatus from "http-status";
import catchAsync from "../../lib/helpers/catch-async";
import ResponseObject from "../../lib/helpers/response-object";
import ResponseCodes from "../../../commons/response-codes";
import { AccountProfileService } from "../../services/profile-service";
import Prisma from "../../lib/prisma";

const db = Prisma.Instance.db;
const accountProfile = new AccountProfileService(Prisma.Instance.db);

export default catchAsync(async (req, res) => {
  const account = await accountProfile.create(req.body);
  await db.$disconnect();
  ResponseObject(res, httpStatus.OK, ResponseCodes.DATA_CREATED, account);
});

import express from "express";
import { AccountSignup } from "../handlers/account";
import RequestMiddleware from "../middleware/request-middleware";
import { SignupRequest } from "../lib/requests/account-requests";

const router = express.Router();
const request = new RequestMiddleware();

router.post(
  "/signup",
  request.requestSchemaValidate(SignupRequest),
  AccountSignup
);

export default router;

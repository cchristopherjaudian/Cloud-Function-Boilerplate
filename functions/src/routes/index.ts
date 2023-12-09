import { Router } from "express";
import accountRoutes from "./account-routes";
import { TRoutelist } from "../types/router";

const router = Router();

const defaultRoutes: TRoutelist = [
  {
    path: "/accounts",
    controller: accountRoutes,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.controller));

export default router;

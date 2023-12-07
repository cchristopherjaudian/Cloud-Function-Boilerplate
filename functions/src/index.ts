import express from "express";
import * as logger from "firebase-functions/logger";
import CloudFunctions from "./lib/cloud-functions";
import ErrorMiddleware from "./middleware/error-middleware";
import { HttpsFunction } from "firebase-functions/v2/https";

const app = express();

app.get("/", (request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.json("Hello from Firebase!");
});

// route middlewares e.g(not found, error handlers)
app.use(new ErrorMiddleware().errorResponse);
app.use(new ErrorMiddleware().notFound);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const v2 = CloudFunctions.instance
  .withRuntime()
  .handlerV2(<HttpsFunction>(<unknown>app));

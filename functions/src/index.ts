import express from "express";
import cors from "cors";
import CloudFunctions from "./lib/cloud-functions";
import ErrorMiddleware from "./middleware/error-middleware";
import { HttpsFunction } from "firebase-functions/v2/https";
import routes from "./routes";

const app = express();

app.use(cors());

// initialized service routes
app.use(routes);

// route middlewares e.g(not found, error handlers)
app.use(new ErrorMiddleware().errorResponse);
app.use(new ErrorMiddleware().notFound);

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const api = CloudFunctions.instance
  .withRuntime()
  .handlerV2(<HttpsFunction>(<unknown>app));

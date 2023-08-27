/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import express from 'express';
import * as logger from 'firebase-functions/logger';
import CloudFunctions, { THttpsFunction } from './lib/cloud-functions';
const app = express();

app.get('/', (request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.json('Hello from Firebase!');
});

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
export const v1 = new CloudFunctions()
  .withRuntime()
  .handlerV1(<THttpsFunction>(<unknown>app));

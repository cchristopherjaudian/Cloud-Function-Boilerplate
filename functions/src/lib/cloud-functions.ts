import { initializeApp } from "firebase-admin/app";
import * as cf from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { IHttpOptions } from "../..";

export type THttpsFunction = cf.HttpsFunction;

initializeApp();

setGlobalOptions({ maxInstances: 10 });

class CloudFunctions {
  private _cf = cf;
  private _options = { region: process.env.REGION } as IHttpOptions;
  private static _instance: CloudFunctions;

  public static get instance(): CloudFunctions {
    this._instance = this._instance || new CloudFunctions();
    return this._instance;
  }

  public withRuntime(options?: IHttpOptions): CloudFunctions {
    this._options ??= options as IHttpOptions;
    return this;
  }

  public handlerV2(func: cf.HttpsFunction): cf.HttpsFunction {
    return this._cf.onRequest(this._options, func);
  }
}

export default CloudFunctions;

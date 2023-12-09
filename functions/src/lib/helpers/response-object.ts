import { Response } from "express";

const ResponseObject = (
  res: Response,
  status: number,
  code: string,
  respObject: Record<string, any> | null
) => {
  return res.status(status).json({
    status,
    code,
    data: respObject,
  });
};

export default ResponseObject;

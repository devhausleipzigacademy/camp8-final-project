import { describe, it, expect } from "vitest";
import {
  createMocks,
  createRequest,
  createResponse,
  RequestMethod,
} from "node-mocks-http";
import helloHandler from "../../../pages/api/hello";
import { NextApiRequest, NextApiResponse } from "next";

type ApiRequest = NextApiRequest & ReturnType<typeof createRequest>;
type ApiRespone = NextApiResponse & ReturnType<typeof createResponse>;

describe.only("/api/hello", () => {
  function mockRequestResponse(method: RequestMethod, query: any = {}) {
    const { req, res }: { req: ApiRequest; res: ApiRespone } = createMocks({
      method,
    });
    req.query = query;
    return {
      req,
      res,
    };
  }

  it("should return a successful response", async () => {
    const name = "John";
    const { req, res } = mockRequestResponse("GET", { name: name });
    await helloHandler(req, res);
    expect(res.statusCode).toEqual(200);
  });

  it("should return error response when given no query", async () => {
    const { req, res } = mockRequestResponse("GET");
    await helloHandler(req, res);
    expect(res.statusCode).toEqual(422);
    console.log(res._getJSONData());
    expect(res._getJSONData()).toEqual({
      error: { name: ["Name is required"] },
    });
  });
});

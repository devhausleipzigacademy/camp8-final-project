import { defineEndpoints } from "next-rest-framework/client";
import { z } from "zod";

const todoSchema = z.object({
  id: z.string(),
  name: z.string(),
  completed: z.boolean(),
});

export default defineEndpoints({
  POST: {
    input: {
      contentType: "application/json",
      body: z.object({
        name: z.string(),
        id: z.string(),
      }),
      query: z.object({
        page: z.string(),
      }),
    },
    output: [
      {
        status: 201,
        contentType: "application/json",
        schema: todoSchema,
      },
    ],
    handler: ({
      res,
      req: {
        body: {
          name, // Any other attribute will lead to TS error.
        },
        query: {
          page, // Any other attribute will lead to TS error.
        },
      },
    }) => {
      const hello = page + name;
      // Any other content type will lead to TS error.
      res.setHeader("content-type", "application/json");
      // Any other status or JSON format will lead to TS error.
      res.status(201).json({
        id: "foo",
        name: hello,
        completed: false,
      });
    },
  },
});

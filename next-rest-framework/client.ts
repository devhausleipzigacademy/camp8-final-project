import { NextRestFramework } from "next-rest-framework";

export const { defineCatchAllHandler, defineEndpoints } = NextRestFramework({
  apiRoutesPath: "src/pages/api",
});

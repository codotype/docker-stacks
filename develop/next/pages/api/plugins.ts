// import { testState } from "@codotype/core";
import { NextMongoStarter } from "@codotype/ui/dist/src/pages/web_runtime/__tests__/test_state/NextMongoStarterPlugin";

// GET /api/plugins
export default async (req: any, res: any) => {
    res.statusCode = 200;
    res.json([NextMongoStarter]);
};

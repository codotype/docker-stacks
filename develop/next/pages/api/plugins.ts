import { testState } from "@codotype/core";

// GET /api/plugins
export default async (req: any, res: any) => {
    res.statusCode = 200;
    res.json({ plugins: [testState.cdkPluginMeta] });
};

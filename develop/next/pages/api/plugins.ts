import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import { RuntimeLogBehaviors } from "@codotype/core";
import { NextMongoStarter } from "@codotype/ui/dist/src/pages/web_runtime/__tests__/test_state/NextMongoStarterPlugin";

// Invoke runtime directly with parameters
const runtime = new NodeRuntime({
    cwd: process.cwd(),
    logBehavior: RuntimeLogBehaviors.normal,
    fileOverwriteBehavior: "force",
    fileSystemAdapter: new LocalFileSystemAdapter(),
});

// // // //

// GET /api/plugins
export default async (req: any, res: any) => {
    // Registers this generator via relative path
    try {
        await runtime.registerPlugin({
            // absolutePath: process.cwd(),
            relativePath:
                "../../../../generators/codotype-generator-starter-kit",
        });
        const plugins = await runtime.getPlugins();
        res.statusCode = 200;
        res.json(plugins.map(p => p.pluginMetadata));
        return;
    } catch (err) {
        // throw err;
        console.error(err);
        res.statusCode = 200;
        res.json([NextMongoStarter]);
    }
};

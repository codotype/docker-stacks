import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
import { OUTPUT_DIRECTORY } from "@codotype/runtime/dist/constants";
import { RuntimeLogBehaviors, ProjectBuild } from "@codotype/core";

// Invoke runtime directly with parameters
const runtime = new NodeRuntime({
    cwd: process.cwd(),
    logBehavior: RuntimeLogBehaviors.normal,
    fileOverwriteBehavior: "force",
    fileSystemAdapter: new LocalFileSystemAdapter(),
});

// // // //

// POST /api/generate
export default async (req: any, res: any) => {
    try {
        await runtime.registerPlugin({
            // absolutePath: process.cwd(),
            // relativePath: "../../../../generators/codotype-generator-starter-kit",
            relativePath: "../plugin",
        });

        // Defines bodotype build
        // FEATURE - verify ProjectInput here here
        // TODO - add new ProjectBuild primative to core
        const build: ProjectBuild = {
            id: "text-build-local-docker",
            projectInput: req.body.projectInput,
            startTime: "",
            endTime: "",
        };

        // Generates the application
        await runtime.execute({ build });

        // Sends the local directory path to the client
        res.statusCode = 200;
        res.json({
            filepath:
                process.cwd() +
                OUTPUT_DIRECTORY +
                build.projectInput.identifiers.snake,
            type: "LOCAL_PATH",
        });
        return;
    } catch (err) {
        // throw err;
        console.error(err);
        res.statusCode = 200;
        res.json({
            type: "S3_DOWNLOAD",
            url: "https://google.com",
        });
    }

    res.statusCode = 200;
};

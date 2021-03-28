import * as fs from "fs";
import { LocalFileSystemAdapter, NodeRuntime } from "@codotype/runtime";
// import { OUTPUT_DIRECTORY } from "@codotype/runtime/dist/constants";
import {
    RuntimeLogBehaviors,
    ProjectBuild,
    ProjectInput,
    makeUniqueId,
} from "@codotype/core";
import {
    uploadBuildToS3,
    uploadFileToS3,
    getSignedDownloadUrl,
} from "../../src/s3";
import {
    zipFilename,
    buildDirectoryPath,
    compressBuild,
} from "../../src/compress";

// // // //

const cwd = process.cwd();

const runtime = new NodeRuntime({
    cwd,
    logBehavior: RuntimeLogBehaviors.normal,
    fileOverwriteBehavior: "force",
    fileSystemAdapter: new LocalFileSystemAdapter(),
});

// // // //

// POST /api/generate
export default async (req: any, res: any) => {
    try {
        await runtime.registerPlugin({
            relativePath: "../plugin",
            // absolutePath:
            //     "/home/aeksco/code/codotype/codotype/packages/generators/codotype-generator-starter-kit",
        });

        // Pulls project input from req.body
        const projectInput: ProjectInput = req.body.projectInput;

        // Defines buildID
        const buildID: string = `${
            projectInput.identifiers.camel
        }-${makeUniqueId()}`;

        // Defines bodotype build
        // FEATURE - verify ProjectInput here here
        // TODO - add new ProjectBuild primative to core
        const build: ProjectBuild = {
            id: buildID,
            projectInput,
            startTime: "",
            endTime: "",
        };

        // Generates the application
        await runtime.execute({ build });

        // Defines key for storage in S3
        const filename = zipFilename(cwd, buildID);
        const key = filename.split("/").pop();

        // Compress the build as a .zip
        await compressBuild({ id: buildID, cwd });

        // Uploads the renamed filing download to S3
        await uploadFileToS3(filename, String(key));

        // Send the signed URL to the client to download zipped build
        const download_url = await getSignedDownloadUrl(String(key));

        // Sends the local directory path to the client
        res.statusCode = 200;
        res.json({
            filepath: download_url,
            type: "S3_DOWNLOAD",
        });

        // Send build JSON to s3
        await uploadBuildToS3({ build });

        // Cleanup old local files
        setTimeout(() => {
            console.log("Deleting folder + zip");
            console.log(filename);
            console.log(buildID);

            // Get path of the build directory
            const buildDirPath = buildDirectoryPath(cwd, buildID);

            // Delete the build's directory
            fs.rmdir(buildDirPath, { recursive: true }, err => {
                if (err) {
                    throw err;
                }

                console.log(`${buildDirPath} directory is deleted!`);
            });

            // Dlete the build's .zip file
            fs.unlink(filename, err => {
                if (err) {
                    throw err;
                }
                // Delete the build's zip file
                console.log("DELETED ZIP");
            });
        }, 5000);

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

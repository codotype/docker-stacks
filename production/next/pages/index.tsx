import * as React from "react";
import dynamic from "next/dynamic";
import { PluginFetcher } from "@codotype/ui/dist/src/pages/web_runtime/PluginFetcher";
import { PluginRunner } from "@codotype/ui/dist/src/pages/web_runtime/PluginRunner";

const LocalStorageProvider = dynamic(
    // @ts-ignore
    import("@codotype/ui/dist/src/pages/web_runtime/LocalStorageProvider").then(
        mod => mod.LocalStorageProvider,
    ),
    {
        ssr: false,
    },
);

const ProjectEditor = dynamic(
    // @ts-ignore
    import("@codotype/ui/dist/src/components/ProjectEditor").then(
        mod => mod.ProjectEditor,
    ),
    {
        ssr: false,
    },
);

// // // //

export default () => {
    if (typeof window === "undefined") {
        return <p>Server Render</p>;
    }
    return (
        <PluginFetcher>
            {({ plugins }) => (
                <PluginRunner plugin={plugins[0]}>
                    {({ generateCode }) => (
                        // @ts-ignore
                        <LocalStorageProvider plugin={plugins[0]}>
                            {/* @ts-ignore */}
                            {({ projectInput, clearProject, setProject }) => (
                                <ProjectEditor
                                    // @ts-ignore
                                    plugin={plugins[0]}
                                    projectInput={projectInput}
                                    onClickGenerate={() => {
                                        generateCode({
                                            projectInput,
                                        });
                                    }}
                                    onResetProject={clearProject}
                                    onChange={setProject}
                                />
                            )}
                        </LocalStorageProvider>
                    )}
                </PluginRunner>
            )}
        </PluginFetcher>
    );
};

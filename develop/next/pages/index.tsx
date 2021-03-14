import * as React from "react";
import dynamic from "next/dynamic";
import { PluginFetcher } from "@codotype/ui/dist/src/pages/web_runtime/PluginFetcher";
import { PluginRunner } from "@codotype/ui/dist/src/pages/web_runtime/PluginRunner";

const LocalStorageProvider = dynamic(
    import("@codotype/ui/dist/src/pages/web_runtime/LocalStorageProvider").then(
        mod => mod.LocalStorageProvider,
    ),
    {
        ssr: false,
    },
);

const ProjectEditor = dynamic(
    import("@codotype/ui/dist/src/components/ProjectEditor").then(
        mod => mod.ProjectEditor,
    ),
    {
        ssr: false,
    },
);

// // // //

export default () => {
    return (
        <PluginFetcher>
            {({ plugins }) => (
                <PluginRunner plugin={plugins[0]}>
                    {({ generateCode }) => (
                        <LocalStorageProvider plugin={plugins[0]}>
                            {({ projectInput, clearProject, setProject }) => (
                                <ProjectEditor
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

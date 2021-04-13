import { NextPage } from "next";
import axios from "axios";
import * as React from "react";
import dynamic from "next/dynamic";
import { PluginRunner } from "@codotype/ui/dist/src/pages/web_runtime/PluginRunner";
import { ProjectEditor } from "@codotype/ui/dist/src/components/ProjectEditor";

const LocalStorageProvider = dynamic(
    // @ts-ignore
    import("@codotype/ui/dist/src/pages/web_runtime/LocalStorageProvider").then(
        mod => mod.LocalStorageProvider,
    ),
    {
        ssr: false,
    },
);

// // // //

interface Props {
    plugins: any[];
}

const Page: NextPage<Props> = (props: Props) => {
    // if (typeof window === "undefined") {
    //     return <p>Server Render</p>;
    // }
    const { plugins = [] } = props;
    if (plugins.length === 0) {
        return <p>Plugin Not Found</p>;
    }

    return (
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
    );
};

Page.getInitialProps = async ({}) => {
    const response = await axios.request({
        url: "http://localhost:3000/api/plugins",
    });
    return { plugins: response.data };
};

export default Page;

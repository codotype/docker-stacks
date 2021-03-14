import * as React from "react";
import { AppNavbar } from "@codotype/ui/dist/src/components/navbar";
import dynamic from "next/dynamic";

const LocalRuntime = dynamic(
    import("@codotype/ui/dist/src/pages/web_runtime/LocalRuntime").then(
        mod => mod.LocalRuntime,
    ),
    {
        ssr: false,
    },
);

// // // //

export default () => {
    return (
        <div>
            <AppNavbar />
            <div className="mt-4 pt-4">
                <LocalRuntime />
            </div>
        </div>
    );
};

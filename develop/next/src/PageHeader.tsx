import * as React from "react";

// // // //

export function PageHeader() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-indigo-600 p-6">
            <div className="flex items-center flex-no-shrink text-white mr-6">
                <span className="font-semibold text-xl tracking-tight">
                    Codotype Dev
                </span>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">
                    <a
                        href="#responsive-header"
                        className="block mt-4 lg:inline-block lg:mt-0 text-indigo-300 hover:text-white mr-4"
                    >
                        Documentation
                    </a>
                </div>
            </div>
        </nav>
    );
}

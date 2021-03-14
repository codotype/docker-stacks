import React from "react";
import { PageHeader } from "../src/PageHeader";
import App from "next/app";
import "../styles/index.css";

export default class extends App {
    render() {
        const { Component, pageProps } = this.props;

        return (
            <div className={"h-full pb-32 bg-gray-100"}>
                <PageHeader></PageHeader>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full dark:bg-gray-800 bg-gray-100 dark:text-gray-200">
                    <div className="grid grid-cols-1">
                        <div className="col-span-1 mt-5">
                            <Component {...pageProps} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

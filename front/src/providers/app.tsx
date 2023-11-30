import {ErrorBoundary} from 'react-error-boundary'
import {BrowserRouter} from 'react-router-dom';
import {QueryClientProvider} from './QueryClientProvider';
import {AppRoutes} from "../routes/AppRoutes";
import {HelmetProvider} from "react-helmet-async";
import React from 'react';
import Spinner from "../ui/spinner";
import {DialogProvider} from "./DialogProvider.tsx";

const ErrorFallback = () => {
    return (
        <div
            className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
            role="alert"
        >
            <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
            <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
                Refresh
            </button>
        </div>
    );
};


export const AppProvider = () => {
    return (
        <React.Suspense fallback={
            <div className="flex items-center justify-center w-screen h-screen">
                <Spinner/>
            </div>
        }>
            <ErrorBoundary fallbackRender={() => (<ErrorFallback/>)}>
                <HelmetProvider>
                    <QueryClientProvider>
                        <DialogProvider>
                            <BrowserRouter>
                                <AppRoutes/>
                            </BrowserRouter>
                        </DialogProvider>
                    </QueryClientProvider>
                </HelmetProvider>
            </ErrorBoundary>
        </React.Suspense>
    )
}
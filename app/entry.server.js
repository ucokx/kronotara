import { jsx as _jsx } from "react/jsx-runtime";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ServerRouter } from "react-router";
export default async function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
    let body = await renderToReadableStream(_jsx(ServerRouter, { context: routerContext, url: request.url }), {
        signal: request.signal,
        onError(error) {
            // Log URI errors to console but they don't affect status code
            console.error(error);
            responseStatusCode = 500;
        },
    });
    if (isbot(request.headers.get("user-agent") || "")) {
        await body.allReady;
    }
    responseHeaders.set("Content-Type", "text/html");
    return new Response(body, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}

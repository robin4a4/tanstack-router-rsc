// @ts-ignore
import * as ReactServerDom from "react-server-dom-webpack/server.browser";
import { createElement } from "react";
import { readClientComponentMap, resolveClientDist, resolveServerDist } from "./utils";

const port = 8080;

const server = Bun.serve({
    port,
    async fetch(request) {
        const { pathname, searchParams } = new URL(request.url);
        if (pathname === "/rsc") {
            const componentFile = searchParams.get("component")
            const PageModule = await import(
                resolveServerDist(
                    `${componentFile}.js${
                        process.env.NODE_ENV === "development"
                            ? `?invalidate=${Date.now()}`
                            : ""
                    }`,
                )
            );

            const Page = createElement(
                PageModule.default,
                Object.fromEntries(searchParams),
            );
        
            const clientComponentMap = await readClientComponentMap();
            const stream = ReactServerDom.renderToReadableStream(
                Page,
                clientComponentMap,
            );
            return new Response(stream, {
                headers: {
                    "Content-type": "text/x-component",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        if (pathname.startsWith("/dist/client")) {
            const filePath = pathname.replace("/dist/client/", "");
            const contents = Bun.file(
                resolveClientDist(filePath),
            );
            return new Response(contents, {
                headers: {
                    "Content-Type": "application/javascript",
                },
            });
        }
        
        // Serve HTML homepage that fetches and renders the server components.
        if (pathname.startsWith("/")) {
            const html = Bun.file(
                new URL("./template/index.html", import.meta.url),
            );
            return new Response(html, {
                headers: { "Content-type": "text/html" },
            });
        };

        return new Response("404!");
    }
})

console.log(`Listening on ${server.port}`);
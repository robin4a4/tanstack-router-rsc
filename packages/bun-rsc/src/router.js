// @ts-expect-error Module '"react"' has no exported member 'use'.
import { StrictMode, useEffect, useState, use, Suspense } from "react";
import { createRoot } from "react-dom/client";
// @ts-expect-error Module '"react-server-dom-webpack"' don't have types
import { createFromFetch } from "react-server-dom-webpack/client";

// const root = createRoot(document.getElementById("root"));
// root.render(
//   <StrictMode>
//     <Router />
//   </StrictMode>
// );

// let callbacks: Array<(...args: any) => any> = [];
// // @ts-expect-error Property 'router' does not exist on type 'Window & typeof globalThis'.
// window.router = {
//   navigate(url: string) {
//     window.history.replaceState({}, "", url);
//     callbacks.forEach((cb) => cb());
//   },
// };

// function Router() {
//   const [url, setUrl] = useState("/rsc" + window.location.search);

//   useEffect(() => {
//     function handleNavigate() {
//       startTransition(() => {
//         setUrl("/rsc" + window.location.search);
//       });
//     }
//     callbacks.push(handleNavigate);
//     window.addEventListener("popstate", handleNavigate);
//     return () => {
//       callbacks.splice(callbacks.indexOf(handleNavigate), 1);
//       window.removeEventListener("popstate", handleNavigate);
//     };
//   }, []);

//   return (
//     <>
//       <ServerOutput url={url} />
//     </>
//   );
// }

const initialCache = new Map();

export function rscLoader({ location }) {
  const pathNameSplit = location.pathname.split("/");
  const lastSegment = pathNameSplit[pathNameSplit.length - 1];
  const url = `/rsc?component=${lastSegment}`;

  return createFromFetch(fetch(url));
}

export function Await({ component, fallback }) {
  return <Suspense fallback={fallback}>{use(component)}</Suspense>;
}

export function ServerOutput({ componentName, fallback }) {
  const url = `/rsc?component=${componentName}`;

  const [cache, setCache] = useState(initialCache);
  if (!cache.has(url)) {
    cache.set(url, createFromFetch(fetch(url)));
  }
  const lazyJsx = cache.get(url);
  return <Suspense fallback={fallback}>{use(lazyJsx)}</Suspense>;
}

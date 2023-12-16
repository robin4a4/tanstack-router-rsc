// @ts-expect-error Module '"react"' has no exported member 'use'.
import React, { useState, use, Suspense } from "react";
//@ts-ignore
import { createFromFetch } from "react-server-dom-webpack/client";

const initialCache = new Map();

export async function rscLoader(loader: any) {
  const pathNameSplit = loader.location.pathname.split("/");
  const lastSegment = pathNameSplit[pathNameSplit.length - 1];
  const url = `/rsc?component=${lastSegment}`;
  const fetchedData = fetch(url);

  return { fetchedData };
}

export function Await({ route, fallback }: { route: any; fallback: React.ReactNode }) {
  const { fetchedData } = route.useLoaderData();

  const [cache] = useState(initialCache);
  if (!cache.has(route.id)) {
    const component = createFromFetch(fetchedData);
    cache.set(route.id, component);
  }
  const lazyJsx = cache.get(route.id);

  return <Suspense fallback={fallback}>{use(lazyJsx)}</Suspense>;
}

export function ServerOutput({ componentName, fallback }: { componentName: string; fallback: React.ReactNode }) {
  const url = `/rsc?component=${componentName}`;

  const [cache] = useState(initialCache);
  if (!cache.has(url)) {
    const fetchedData = fetch(url);
    const component = createFromFetch(fetchedData);
    cache.set(url, component);
  }
  const lazyJsx = cache.get(url);
  return <Suspense fallback={fallback}>{use(lazyJsx)}</Suspense>;
}

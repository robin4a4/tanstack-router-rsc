// @ts-expect-error Module '"react"' has no exported member 'use'.
import React, { useState, use, Suspense } from "react";
//@ts-ignore
import { createFromFetch } from "react-server-dom-webpack/client";

const initialCache = new Map();

export async function rscLoader(rscName: string) {
  const url = `/rsc?component=${rscName}`;
  const fetchedData = fetch(url);

  return { fetchedData };
}

export function RSCWithLoader({ route, fallback }: { route: any; fallback: React.ReactNode }) {
  const { fetchedData } = route.useLoaderData();

  const [cache] = useState(initialCache);
  if (!cache.has(route.id)) {
    const component = createFromFetch(fetchedData);
    cache.set(route.id, component);
  }
  const lazyJsx = cache.get(route.id);

  return <Suspense fallback={fallback}>{use(lazyJsx)}</Suspense>;
}

export function RSCWithoutLoader({ route, fallback }: { route: any; fallback: React.ReactNode }) {
  const url = `/rsc?component=${route.path === "/" ? "index" : route.path}`;

  const [cache] = useState(initialCache);
  if (!cache.has(url)) {
    const fetchedData = fetch(url);
    const component = createFromFetch(fetchedData);
    cache.set(url, component);
  }
  const lazyJsx = cache.get(url);
  return <Suspense fallback={fallback}>{use(lazyJsx)}</Suspense>;
}

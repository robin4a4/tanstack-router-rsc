import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router'

import {rscLoader, RSCWithLoader, RSCWithoutLoader} from "tanstack-router-rsc" 

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/with-loader" className="[&.active]:font-bold">
          With loader
        </Link>
        <Link to="/without-loader" className="[&.active]:font-bold">
          Without loader
        </Link>
      </div>
      <hr />
      <Outlet />
    </>
  ),
})

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: function Index() {
    return (
      <div className="flex flex-col gap-4 border border-red-500 rounded p-4">
        Rendered on client
        <RSCWithoutLoader route={indexRoute} fallback={<div className="bg-gray-100 rounded grid place-content-center" style={{height: "142px"}}>Loading...</div>} />
        Also rendered on client
      </div>
    )
  },
})

const withLoaderRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/with-loader',
  loader: () => rscLoader("with-loader"), // I would like to just do `loader: rscLoader` but we can't retrieve the route name in  the loader's args
  component: () => <RSCWithLoader route={withLoaderRoute} fallback={<div>Loading...</div>} />
})

const withoutLoaderRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/without-loader',
  component: () => <RSCWithoutLoader route={withoutLoaderRoute} fallback={<div>Loading...</div>} />
})

const routeTree = rootRoute.addChildren([indexRoute, withLoaderRoute, withoutLoaderRoute])

const router = new Router({ routeTree, defaultPreload: 'intent' })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// @ts-ignore
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
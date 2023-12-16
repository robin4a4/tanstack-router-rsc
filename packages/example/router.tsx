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

import {rscLoader, Await, ServerOutput} from "tanstack-router-rsc" 

const rootRoute = new RootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{' '}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/contact" className="[&.active]:font-bold">
          Contact
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
      <div className="p-2">
        <h3>Welcome Home!</h3>
      </div>
    )
  },
})

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  loader: rscLoader,
  component: () => <Await route={aboutRoute} fallback={<div>Loading...</div>} />
})

const contactRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: () => <ServerOutput componentName="about" fallback={<div>Loading...</div>} />
})

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, contactRoute])

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
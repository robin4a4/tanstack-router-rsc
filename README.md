# tanstack-router-rsc

Minimalist React server component implementation using bun using tanstack router on the client

Heavily inspired by:
- https://github.com/bholmesdev/simple-rsc
- https://github.com/hex2f/marz# tanstack-router-rsc


## Run the example

Install the packages:
```
bun install
```

Build the library:
```
cd packages/tanstack-router-rsc; bun run build
```

Build the app:
```
cd ../packages/example; bun run build
```

Serve:
```
bun run serve
```

## How it works

### Entry point

The entry point of the app is a `router.tsx` file at the root of the project (seee example/router.tsx)

### The `rsc` folder

The APIs are only capable of reading server components located in a `rsc` folder at the root of the project. There is also no nesting possible: every server component can only be placed at the root of this folder.

### APIs:

#### `rscLoader`

It allows to preload rsc components in the loader key of the route. You have to pass it the route name. I would like to just do `loader: rscLoader` but we can't retrieve the route name in  the loader's args so we have to do:

```javascript
loader: () => rscLoader("the-route-name")
```

#### `RSCWithLoader`

A react component wich accept the route and a fallback as props and which is used in tandem with the rscLoader. Behind the scene it just uses the useLoaderData to retrieve the rsc payload.

#### `RSCWithoutLoader`

A react component wich accept the route and a fallback as props and which fetches the rsc and returns it directly. We can't preload anything with this component.







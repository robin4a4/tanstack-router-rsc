const result = await Bun.build({
    target: "bun",
    sourcemap: "none",
    splitting: true,
    format: "esm",
    entrypoints: ["./src/loader.tsx"],
    external: ["react", "react-dom", "react-server-dom-webpack"],
    outdir: "dist"
}); 

console.log(result)
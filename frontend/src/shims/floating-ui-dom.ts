// The installed package is missing its standard ESM entrypoint, so we route
// Vite to the published fallback file that is present on disk.
// @ts-ignore
export * from '../../node_modules/@floating-ui/dom/dist/floating-ui.dom.esm.js'

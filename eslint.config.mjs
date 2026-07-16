import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// eslint-config-next ships a native flat-config array (which already
// includes the base "next" and "next/typescript" configs) — the older
// FlatCompat().extends("next/core-web-vitals", "next/typescript") bridge
// isn't needed anymore, and now crashes on startup (circular structure in
// eslint-plugin-react's config object trips FlatCompat's JSON-based
// validator).
const eslintConfig = [...nextCoreWebVitals];

export default eslintConfig;

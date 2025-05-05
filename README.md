# KILT Protocol SDK Documentation Support

This repository contains runnable code examples that support the KILT Protocol SDK v1.0.0 documentation. These scripts are decoupled from our primary documentation platform to allow independent testing, validation, and maintenance of SDK examples.

Previously, code examples were maintained inline within our Docusaurus docs site. With the upgrade from @kiltprotocol/sdk-js v0.36.0 to v1.0.0, we have moved examples into this separate project to better support automation, maintainability, and version control.

## Purpose
Provide working, testable TypeScript examples that demonstrate how to use the KILT SDK and associated tooling.

Detect breaking changes early through CI or scheduled cron jobs that run the scripts automatically.

Serve as the source of truth for examples in the v1.0.0 documentation.

Enable efficient update workflows by copying verified code into our docs after review.

## Installation

This project uses pnpm as the package manager.

```bash
pnpm install
```

Make sure you have pnpm installed globally:

```bash
npm install -g pnpm
```

## Running Examples
To run the default script (basics/test.ts):

```bash
pnpm start
```

To run a different example file:

```bash
pnpm exec -- node --loader ts-node/esm path/to/script.ts
```

Example:
```bash
pnpm exec -- node --loader ts-node/esm basics/issueCredential.ts
```

Note: You may want to create additional shortcuts for specific examples using custom scripts in package.json.

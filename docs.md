# API

We use loopback

## How to setup dev using nodemon

Nodemon is a tool We use [Nodemon](https://www.npmjs.com/package/nodemon) to automatically restart the node application when the file changes.

- Install the package `npm install --save-dev nodemon`

- Add nodemon config to package.json

```
    "nodemonConfig": {
        "verbose": true,
        "ignore": [
        "test/*",
        "docs/*",
        "dist/*"
        ],
        "ext": "ts",
        "exec": "npm "
    },
```

- Add the following commands inside the package.json under the scripts sections

```
    "prestart:dev": "npm run clean && npm run build",
    "start:dev": "node -r source-map-support/register  --async-stack-traces ./dist/index.js",
    "dev": "nodemon --signal SIGINT ./dist/index.js --exec \"npm run start:dev\"",
```

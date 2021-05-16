# my-midway-project

## QuickStart

<!-- add docs here for user -->

see [midway docs][midway] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.

- openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub

- "start": "NODE_ENV=production node ./bootstrap.js",
    "dev": "cross-env ets && cross-env NODE_ENV=local midway-bin dev --ts --entryFile=bootstrap.js",
    "start": "egg-scripts start --daemon --title=my-midway-project --framework=@midwayjs/web",
    "stop": "egg-scripts stop --title=my-midway-project",
    "start_build": "npm run build && cross-env NODE_ENV=development midway-bin dev",
    "dev": "cross-env ets && cross-env NODE_ENV=local midway-bin dev --ts",
    "test": "midway-bin test --ts",
    "cov": "midway-bin cov --ts",
    "lint": "mwts check",
    "lint:fix": "mwts fix",
    "ci": "npm run cov",
    "build": "midway-bin build -c",
    "check": "luckyeye"

[midway]: https://midwayjs.org

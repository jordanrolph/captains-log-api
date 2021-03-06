# captains-log-api

The serverless backend for [captainslog.xyz](https://captainslog.xyz).

## About this Project

`captains-log-api` is a serverless REST API. Along with the `captains-log-frontend`, it lets authenticated users keep a personal diary in the cloud.

I started this project as a personal experiment using NextJS with a serverless backend. This backend part was bootstrapped with [Create Serverless Stack](https://docs.serverless-stack.com/packages/create-serverless-stack). It specifies infrastructure as code, leveraging the `sst-cli` tool to create all the resources it needs on AWS. The CRUD endpoints are all powered by lambda functions (see `/src/`). Diary entries are stored in a DynamoDB table, and user's uploads are stored in S3.

## Make your own version

You easily can deploy your own copy of this api.

Start by installing the dependencies.
`npm install`

## Commands

### `npm run start`

Starts the local Lambda development environment.

### `npm run build`

Build your app and synthesize your stacks.

Generates a `.build/` directory with the compiled files and a `.build/cdk.out/` directory with the synthesized CloudFormation stacks.

### `npm run deploy [stack]`

Deploy all your stacks to AWS. Or optionally deploy, a specific stack.

### `npm run remove [stack]`

Remove all your stacks and all of their resources from AWS. Or optionally removes, a specific stack (e.g. `npx sst remove --stage prod`)

### `npm run test`

Runs your tests using Jest. Takes all the [Jest CLI options](https://jestjs.io/docs/en/cli).

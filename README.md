This is a redacted repo snapshot for educational purposes.  It is a monorepo consisting of application code for Tree Equity Score. Frontend with an rpc database layer and a few of the data pipeline components.

This turborepo uses [Yarn](https://classic.yarnpkg.com/) as a package manager. It includes the following packages/apps:

### Apps

- `tes`: Blitz app for US Tree Equity National Explorer and TESAs
- `tes-uk`: Bltiz app for UK Tree Equity National Explorer

### Packages

- `eslint-custom-config`: shared eslint config
- `react-hooks`: shared React hooks
- `tailwind-config`: shared Tailwind CSS config
- `tes-types`: shared types
- `tsconfig`: shared TypeScript config
- `ui`: React component library
- `utils`: shared TypeScript functions

### Prerequisites

- Node: 16.19.1
- Yarn: 1.22.4
- Postgres: 15.x
- PostGIS: 3.3.x
- AWS CLI
- [prettier-vscode](https://prettier.io/docs/en/editors.html) extension

### Getting Started

To install all app and package dependencies just run `yarn install` from the monorepo root. Since this is a Turborepo monorepo, you should always install dependencies from the root of the repo. For more detailed information on working with Turborepo, refer to the [Turborepo documentation](https://turbo.build/repo/docs). Please see the individual app READMEs for instructions on how to get started with local development for each application.

Navigate to the application you wish to setup within `/apps`, for example `tes`. Create a `.env.local` file within the application directory. Copy the environment variables from Bitwarden and save them in the `.env.local` file. For example, the environment variables for the `tes` app are saved in a note named `tes app frontend only .env` in Bitwarden. The `.env.local` file should be ignored by default by the root monorepo `.gitignore`. **Make sure you do not commit `.env.local`. These environment variables contain sensitive information.** This setup allows to connect to the production database and tileserver, letting you test and develop frontend changes only.

After setting up the environment variables, you should be good to run the application locally. Make sure you're still within the directory of the application you wish to run.

`yarn client:dev`

This should run the app on localhost:3000.

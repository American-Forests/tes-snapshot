# tes-uk

The respository for our Tree Equity Score UK application.

## Setup

This is a [Blitz](https://blitzjs.com/) project. Blitz is a level
on top of Next.js, which is a level on top of React. It's a high
level of abstraction, which means that this relatively complex
application can be implemented without reimplementing things
like user authentication and routing all from scratch.

### Prerequisites:

- Node.js, `v18.*`
- Yarn, `v1.*`
- Tegola
- Postgres

Since the `tes-uk` application exists within the Tree Equity Score
monorepo (`tes-monorepo`), you should install packages at the root
of the monorepo using: `yarn install`.

The tile server for this project is [Tegola](https://tegola.io/).
The tegola binary is located within `/tegola`. You shouldn't have to
install anything to get the tileserver up and running.

### Starting the application locally

After `yarn install`ing the dependencies, you will need to create a
local postgres database with the same name, user, and password as the
ones in your `.env.local` file (check the `.env.sample` to know which
variables are needed to setup the project).

_Make sure you're in the root of the `tes-uk` application and not the monorepo
root for the following steps_

Once the database is created, run the prisma migrations using: `yarn migrate`.
After running the migrations, you can load data into the database.

First, download the most recent data from the S3 bucket using:
`yarn data:download`. Contact Chase via slack, teams, or (email)[cdawson@americanforests.org]
for AWS credentials if you don't have access to that bucket. Next,
create the `load.sql` file by running `yarn data:prepare`
(Note: you made need to make sure the `/sql/prepare.sh` script is
executable on your computer. To make it execuable navigate to the `sql` folder and run `chmod +x prepare.sh`).
After running the data prepare script, the `/sql/load.sql` file
contains all the necessary SQL transactions to load the data into a postgres database.
Finally, you can load the data into your local postgres database using `yarn data:load`.

You can also run `yarn data` which will run `yarn data:download`, `yarn data:prepare`, and `yarn data:load`
sequentially.

Everything should be ready now to run the following command to start the application:
`yarn dev`. This will start tegola to serve tiles and blitz to run the application.
If a dependency is missing, this will probably fail.

If all goes correctly, you’ll have a server running the client at
http://localhost:3000/. The tileserver will be running at http://localhost:9000/.

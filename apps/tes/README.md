# tes

The repository for our TES National Explorer and TESAs.

## Getting Started

### Prerequisites:

- Node.js, version 18.20.4.
- Yarn, version 1
- Postgres, at least version 15
- [uv](https://docs.astral.sh/uv/)
- AWS cli

If you're already set up in the monorepo, then you don't need to install Node.js and yarn.

Install Postgres if you don't already have it. On macOS,
[Postgres.app](https://postgresapp.com/) is a convenient way
to do so.

If you are on a `linux` machine, you might find the commands in [this gist](https://gist.github.com/weberjavi/b9d6bf4b084d5f4f8b91c082dbf53020) useful in order to interact with `postgreql` from the command line.

This project uses [uv](https://docs.astral.sh/uv/) to install Python and manage your Python versions. You'll need Python in order to load data into your local database.

You will need to [install and configure awscli](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html). You will need an AWS IAM Account with the proper permissions to access the data. Reach out to cdawson@americanforests.org to get access.

### Installing dependencies

Since this app is in a Turborepo monorepo, you'll need to install dependencies from the root of the monorepo. To do so, run the following command from the root of the monorepo:

```
yarn install
```

### Environment variables

After `yarn install`ing the depenedencies from the root of the monorepo, you will need to create a `.env.local` file in the root of the `tes` app. Check the `env.sample` file to know which variables are needed to setup the project. Sensitive environment variables are stored in Bitwarden as a secure note in the American Forests vault > GIS & Data Science > App Dev > `tes app dev .env.local`. Copy the environment variables from that secure note into your `.env.local` file.

### Database

You will need to create a database with the same name, user and password that the ones in your `.env.local` file. Once the database is created, run the prisma migrations using `yarn run migrate`. Now, you can load data into the database.

### Tiles

This app uses PMTiles archives for serving vector tiles. The tileserver is never run locally. Both `NEXT_PUBLIC_TILESERVER_URL` and `NEXT_PUBLIC_TILESERVER_ENV` environment variables need to be set to access tiles for local development. See the [Environment Variables section](#environment-variables) for more information on where to get these values. For more information on the PMTiles or other infrastructure, see the [Infrastructure section](#infrastructure).

### Downloading the data

The data is stored in the `tes-app-dev-geojson` S3 bucket. To download the data locally, run the following command:

```
yarn data:download
```

which will sync the data from the S3 bucket to the `local` folder.

Alternatively you can download data only relevant for the different sections of the app, that is national data or location specific data (itree base values can also be downloaded separately).

- For national data run `yarn download:national`
- For location specific data run `TESA=<tesa-id> yarn download:tesa` where `<tesa-id>` is  the specific location you want data for.
- For itree data run `yarn download:itree`

### Loading the data into the database

You'll be running some python code shared by the `to_postgres` lambda function. Make sure you have [uv](https://docs.astral.sh/uv/) installed. If this is your first time running the python load script, run the following commands to install python and create a virtual environment with the correct dependencies:

```
cd aws/to_postgres && make venv
```

#### National Explorer

Data for the National Explorer is stored in the `tes-app-dev-geojson` S3 bucket in the `\national` folder. You can download the most recent data for just the National Explorer by running:

```
yarn download:national
```

After downloading the data, you can load it into the database by running the following command:

```
yarn load:national
```

#### TESAs

TESA data is stored in the `tes-app-dev-geojson` S3 bucket in the `\location\tesa-id\` folder where `tesa-id` matches the slug of the production url for the TESA. For example, data for Boston, MA is located in `\location\boston\`. Assuming you have downloaded the data, you can run:

```
TESA=tesa-id yarn load:tesa
```

to load the TESA data into your local database. For example, running `TESA=boston yarn load:tesa` will pull the data from `./local/location/boston/` and load that.

#### Itree
Itree data drives the calculations for the ecosystem benefits. It could be loaded to the `Itree` table in the dabase by running `yarn load:itree` 


### Static assets

All static assets should be stored in the `tes-app-static-assets` S3 bucket. At the time of writing, not all static assets have been moved over to the S3 bucket, but that is the future goal. You can access the static assets in the app through their S3 url once they have been uploaded. A cloudfront distribution is connectedto the S3 bucket for better application performance. Static assets are stored at the root of the S3 bucket. For example, https://d17m5nraxo9zm6.cloudfront.net/hero-video.webm accesses the hero-video.webm video for the TES home page.

## Infrastructure

### Application Deployment

#### Launching a new TESA

1. Add necessary database migrations:
   - Add a new enum value in the City ENUM for the TESA location in `db/schema.prisma`:
     ```prisma
     enum City {
       // ... existing cities
       NEW_CITY_NAME
     }
     ```
   - If there are any supplemental columns for the TESA, add them to the BlockgroupSupplemental model in `db/schema.prisma` and to the `aws/to_postgres/to_postgres.py`. Make sure to mark these columns as nullable (using `?` after the type) since not necessarily every block group will have this data. As a best practice when changing any existing models, any new column should be nullable at first to ensure the migration can succeed, even if you plan to make it required later.
   - Create and run the migration:
     ```
     yarn migrate
     ```
2. Download and load data (see "Loading the data into the database" section above for more details)

   - First, download and load the latest National Explorer data since TESA updates involve national data:
     ```
     yarn download:national
     yarn load:national
     ```
   - Then download and load the specific TESA data:
     ```
     TESA=<tesa-id> yarn download:tesa
     TESA=<tesa-id> yarn load:tesa
     ```

   - In order to download all TESA data run

   ```
     yarn data:download
   ```

3. Update TESA location config located in `components/cities.tsx` by adding a new entry for the TESA location in the `CITIES` array.
4. Update facets `data/processed_facet_schemas.json`
5. Add or update pmtiles configs:
   - Create or update tiles.config.json files in the TESA data folder for blockgroups, parcels, rows and trees
   - The config file defines the zoom levels, layer name, and included attributes for the PMTiles archive
   - This config will be used by the data pipeline to generate the PMTiles archive for the TESA location
6. Upload changes to pmtiles folders:
   ```
   TESA=<tesa-id> yarn pmtiles-config:tesa-dev-update
   ```
7. Add new data facets names to `FACET_TITLES` at `app/constants.tsx`

### Data pipeline

The data pipeline for processing and preparing geospatial data for the Tree Equity Score application involves several steps and AWS services. Here's an overview of the process. For a visual representation of this pipeline, you can refer to the detailed diagram available [here]:

1. Data Upload:

   - Data analysts upload zip files to specific locations in the S3 bucket `s3://dev-tes-app-data`.
   - For the National Explorer, files are uploaded to `/national/`.
   - For TESA locations, files are uploaded to `/location/tesa_id/`.

2. Unzip Lambda:

   - Triggered by uploads to `s3://dev-tes-app-data`.
   - Unzips the uploaded files and copies the data to `s3://tes-app-data-unzipped`.
   - Maintains the same folder structure as the source.

3. To GeoJSON Lambda:

   - Triggered by uploads to `s3://tes-app-data-unzipped`.
   - Converts .shp files to .geojsonl (line-delimited GeoJSON) format.
   - Renames columns to match the database schema.
   - Writes the resulting .geojsonl files to `s3://tes-app-dev-geojson`.

4. To PMTiles Lambda:

   - Triggered by uploads to `s3://tes-app-dev-geojson`.
   - When both a .geojsonl file and its associated tiles.config.json are present:
     - Converts the GeoJSON to PMTiles format.
     - Writes the resulting PMTiles file to the `/dev` folder in the PMTiles bucket.

5. To Postgres Lambda:

   - Triggered by uploads to `s3://tes-app-staging-geojson`.
   - Files are copied into this bucket by a manually run GitHub workflow when deploying to staging.
   - Processes the GeoJSON files and inserts the data into the appropriate PostgreSQL database tables.
   - Updates existing records or inserts new ones based on unique identifiers.

6. PG Copy Lambda:
   - Triggered by a manually run GitHub workflow when deploying to production.
   - Copies data from the staging database into the production database.
   - Ensures that the latest validated data is transferred to the production environment.

This automated pipeline allows us to efficiently process large geospatial datasets, ensuring that raw data uploads are transformed into the necessary formats for the application. Importantly, all data destined for production must first pass through the staging environment, allowing for thorough validation and testing before final deployment. This process ensures data integrity and application stability as we move from development to production.

### Tiles

This app uses PMTiles archives for serving vector tiles. The PMTiles archives are stored in the S3 bucket `s3://pmtiles.tes.americanforests.org`. The tiles are served by a Lambda function and connected to a CloudFront distribution for efficient delivery. The bucket is organized with the following folder structure:

- `/dev`: Contains PMTiles archives for development
- `/staging`: Contains PMTiles archives for the staging environment
- `/prod`: Contains PMTiles archives for the production environment

The process of moving PMTiles archives through these environments is automated using GitHub Actions workflows:

1. New or updated PMTiles are initially placed in the `/dev` folder.
2. When deploying to the staging environment, the workflow copies `/dev` to `/staging`.
3. When deploying to the production environment, the workflow copies `/staging` to `/prod`.

This ensures a consistent and controlled progression of tile data from development to production.

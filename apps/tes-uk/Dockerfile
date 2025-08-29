# Use Node.js v18.20.4 as the base image
FROM public.ecr.aws/docker/library/node:18.20.4-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
RUN yarn global add turbo
# copies the monorepo into the working directory of the container
COPY . .
# prunes inputs to dockerfile so it's only the files needed to run the app
RUN turbo prune tes-uk --docker 

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo run build --filter=tes-uk

FROM base as runner
WORKDIR /app

COPY --from=installer /app/apps/tes-uk/blitz.config.ts .
COPY --from=installer /app/apps/tes-uk/package.json .
COPY --from=installer /app/apps/tes-uk/db db
RUN yarn install

# copy over build files
COPY --from=installer /app/apps/tes-uk/.next .next
COPY --from=installer /app/apps/tes-uk/public public

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD yarn start

FROM node:23-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
COPY . /app
WORKDIR /app
RUN corepack enable
RUN corepack prepare --activate


FROM base AS build
RUN apt-get update -y && apt-get install -y openssl
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
RUN pnpm run build

FROM base
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
RUN apt-get update -y && apt-get install -y openssl
EXPOSE 3000
CMD [ "pnpm", "start:migrate:prod" ]
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
RUN apt-get update -y && apt-get install -y openssl libjemalloc2
RUN apt-get install --force-yes -yy \
  libjemalloc2 \
  && rm -rf /var/lib/apt/lists/*

ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
EXPOSE 3000
CMD [ "pnpm", "start:migrate:prod" ]
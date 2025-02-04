ARG NODE_VERSION=20.18.0
ARG PNPM_VERSION=9.15.5

FROM node:${NODE_VERSION}-alpine AS base
# ENV PNPM_HOME="/pnpm"
# ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable

# Install pnpm directly.
RUN npm install -g pnpm@9.15.5


FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app

# Install dependencies with pnpm.
RUN pnpm install --frozen-lockfile
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=backend --prod /prod/backend
# RUN pnpm deploy --filter=app2 --prod /prod/app2

FROM base AS backend
COPY --from=build /prod/backend /prod/backend
WORKDIR /prod/backend
EXPOSE 3000
CMD [ "pnpm", "start" ]

# FROM base AS app2
# COPY --from=build /prod/app2 /prod/app2
# WORKDIR /prod/app2
# EXPOSE 8001
# CMD [ "pnpm", "start" ]
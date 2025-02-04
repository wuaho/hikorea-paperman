ARG NODE_VERSION=20.18.0
ARG PNPM_VERSION=9.15.5

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /app

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

FROM base as deps

WORKDIR /app/apps/backend

COPY ./apps/backend/package.json ./apps/backend/package.json
COPY ./pnpm-lock.yaml ./pnpm-lock.yaml

RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile

FROM deps as build

WORKDIR /app

COPY ./apps/backend/ ./apps/backend/

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

FROM base as final

WORKDIR /app/apps/backend

ENV NODE_ENV production

USER node

COPY ./apps/backend/package.json ./apps/backend/package.json

COPY --from=deps /app/apps/backend/node_modules ./node_modules
COPY --from=build /app/apps/backend/dist ./dist

EXPOSE 3000

CMD ["pnpm", "start"]
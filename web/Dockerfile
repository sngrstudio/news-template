FROM oven/bun:1.2.7-debian AS base

FROM base AS install
WORKDIR /tmp/deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

FROM base AS install-dev
WORKDIR /tmp/deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

FROM base AS prerelease
WORKDIR /usr/src/app
COPY --from=install-dev /tmp/deps/node_modules ./node_modules
COPY . .
RUN bun run build

FROM oven/bun:1.2.7-slim AS release
WORKDIR /usr/src/app
COPY --from=install /tmp/deps/node_modules ./node_modules
COPY --from=prerelease /usr/src/app/dist ./dist
COPY server.mjs ./

USER bun
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["bun", "./server.mjs"]
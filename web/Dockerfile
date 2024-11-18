FROM oven/bun:1.1.34 AS base
WORKDIR /app
COPY package.json bun.lockb ./

FROM base AS prod-deps
RUN bun install --production --frozen-lockfile

FROM base AS build-deps
RUN bun install --frozen-lockfile

FROM build-deps AS build
COPY . .
RUN bun run build

FROM oven/bun:1.1.34-alpine AS runtime
WORKDIR /home/bun/app
COPY --chown=bun:bun --from=prod-deps /app/node_modules ./node_modules
COPY --chown=bun:bun --from=build /app/dist ./dist
COPY --chown=bun:bun server.mjs ./
USER bun
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["bun", "run", "server.mjs"]
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile
RUN pnpm build

EXPOSE 3001

CMD ["pnpm", "start:prod"]

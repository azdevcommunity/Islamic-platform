# ---- deps & build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# ⬇️ BUNLAR YENİ
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_URL_YTB
ARG DEFAULT_PLAYLIST_ID

ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL \
    NEXT_PUBLIC_BASE_URL_YTB=$NEXT_PUBLIC_BASE_URL_YTB \
    DEFAULT_PLAYLIST_ID=$DEFAULT_PLAYLIST_ID \
    NEXT_TELEMETRY_DISABLED=1

# (İstersen debug için bir kere yazdır)
RUN node -e "console.log('EX:', process.env.NEXT_PUBLIC_BASE_URL, 'YTB:', process.env.NEXT_PUBLIC_BASE_URL_YTB)"

RUN npm run build

# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

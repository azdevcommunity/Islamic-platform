# ---- deps & build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# BUILD sırasında dışarıdan bir değer alacağımızı belirtiyoruz.
ARG PUBLIC_API_FOR_BROWSER

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# 'npm run build' komutunu çalıştırırken, Next.js'in ENV değişkenini
# dışarıdan gelen ARG değeriyle dolduruyoruz.
RUN NEXT_PUBLIC_BASE_URL=${PUBLIC_API_FOR_BROWSER} npm run build


# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

# RUNTIME'DA kullanılacak ENV'leri tanımlıyoruz.
# Her biri ayrı bir ENV satırında olmalı. Bu en temiz yöntemdir.
ENV NEXT_PUBLIC_BASE_URL=""
ENV NEXT_PUBLIC_BASE_URL_YTB=""
ENV DEFAULT_PLAYLIST_ID=""
ENV NEXT_PUBLIC_REVALIDATE_SECRET=""

# DİKKAT: --from=builder (eşittir işareti ile)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

# ---- deps & build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# build sırasında kullanılacak ARG'lar burada kalabilir
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_BASE_URL_YTB
ARG DEFAULT_PLAYLIST_ID
# ⬇️ İstemci tarafı için de bir build-time değişkeni ekleyelim
ARG NEXT_PUBLIC_API_URL_BROWSER

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# build işlemi bu ARG'ları kullanacak
RUN NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_BASE_URL} \
    NEXT_PUBLIC_API_URL_BROWSER=${NEXT_PUBLIC_API_URL_BROWSER} \
    NEXT_PUBLIC_BASE_URL_YTB=${NEXT_PUBLIC_BASE_URL_YTB} \
    DEFAULT_PLAYLIST_ID=${DEFAULT_PLAYLIST_ID} \
    npm run build

# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

# ⬇️ ÖNEMLİ DEĞİŞİKLİK: ENV DEĞİŞKENLERİ BURADA TANIMLANMALI
# Coolify bu ENV'leri doğrudan çalışan konteynere verecek.
# Dockerfile içinde değer atamamıza gerek yok.
ENV NEXT_PUBLIC_API_URL="" \
    NEXT_PUBLIC_API_URL_BROWSER="" \
    NEXT_PUBLIC_BASE_URL_YTB="" \
    DEFAULT_PLAYLIST_ID=""

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

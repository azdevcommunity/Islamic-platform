# ---- deps & build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# BUILD sırasında dışarıdan bir değer alacağımızı belirtiyoruz.
# Bu, tarayıcıya gidecek olan DIŞ AĞ adresi olacak.
ARG PUBLIC_API_FOR_BROWSER

COPY package*.json ./
RUN npm ci || npm install

COPY . .

# 'npm run build' komutunu çalıştırırken, Next.js'in ENV değişkenini
# dışarıdan gelen ARG değeriyle dolduruyoruz.
# Bu, DIŞ AĞ adresini tarayıcının JavaScript dosyalarına GÖMER.
RUN NEXT_PUBLIC_BASE_URL=${PUBLIC_API_FOR_BROWSER} \
    npm run build

# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1

# RUNTIME'DA (sunucu tarafında) kullanılacak ENV'yi tanımlıyoruz.
# Coolify, bu değişkeni kendi arayüzündeki değerle dolduracak.
# Bu, İÇ AĞ adresi olacak.
ENV NEXT_PUBLIC_BASE_URL="" \
    NEXT_PUBLIC_BASE_URL_YTB="" \
    DEFAULT_PLAYLIST_ID="" \
    NEXT_PUBLIC_REVALIDATE_SECRET=""


COPY --from-builder /app/.next/standalone ./
COPY --from-builder /app/public ./public
COPY --from-builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

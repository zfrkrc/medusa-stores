FROM node:20-alpine

WORKDIR /app

# Sistem bağımlılıklarını yükle
RUN apk update && apk upgrade --no-cache && apk add --no-cache git curl dos2unix

# Entrypoint scriptini ayarla
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN dos2unix /usr/local/bin/entrypoint.sh && chmod +x /usr/local/bin/entrypoint.sh

# Portu belirle (Next.js için 8000)
EXPOSE 8000

# Entrypoint üzerinden çalıştır
ENTRYPOINT ["entrypoint.sh"]

# Varsayılan komut: Geliştirme modu
CMD ["yarn", "dev"]

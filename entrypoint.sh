#!/bin/sh

# Eğer node_modules yoksa veya boşsa yükleme yap
if [ ! -d "node_modules" ] || [ -z "$(ls -A node_modules)" ]; then
  echo ">>> Node modules bulunamadı veya boş. yarn install çalıştırılıyor..."
  yarn install
else
  echo ">>> Node modules mevcut, install adımı atlanıyor."
fi

# Eğer .next (build) klasörü yoksa build al
if [ ! -d ".next" ]; then
  echo ">>> .next klasörü bulunamadı. yarn build çalıştırılıyor..."
  yarn build
else
  echo ">>> .next klasörü mevcut, build adımı atlanıyor."
fi

# Komutu çalıştır (varsayılan: yarn dev)
exec "$@"

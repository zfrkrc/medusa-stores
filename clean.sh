#!/bin/sh

# Renk ayarları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # Renk Yok

echo "${GREEN}>>> Temizlik işlemi başlatılıyor...${NC}"

# 1. Yerel klasörleri temizle (Eğer host makinede varsa)
echo "${YELLOW}>>> Host üzerindeki .next ve node_modules klasörleri siliniyor...${NC}"
rm -rf hobby-store/.next hobby-store/node_modules
rm -rf clay-store/.next clay-store/node_modules
rm -rf sedefli-store/.next sedefli-store/node_modules
rm -rf template-store/.next template-store/node_modules

echo "${GREEN}>>> Yerel dosyalar temizlendi.${NC}"
echo ""

# 2. Docker Volume uyarısı
echo "${YELLOW}DİKKAT: Docker anonim volume'larını temizlemeden gerçek bir 'sıfır build' alamazsın.${NC}"
echo "Tam bir temizlik ve yeniden kurulum (fresh install + build) için şu komutu kullanmalısın:"
echo ""
echo "${GREEN}docker-compose down -v && docker-compose up -d --build${NC}"
echo ""
echo "Bu komut:"
echo "1. Mevcut konteynerleri durdurur."
echo "2. -v bayrağı ile '.next' ve 'node_modules' volume'larını siler."
echo "3. --build bayrağı ile her şeyi senin yazdığın entrypoint üzerinden sıfırdan kurar."

# Medusa Multi-Storefront

Tek bir Medusa backend üzerinde birden fazla bağımsız storefront çalıştırmak için Dockerize edilmiş Next.js altyapısı.

## 📁 Proje Yapısı

```
medusa-stores/
├── hobby-store/          # Hobby Store (Ana mağaza)
├── clay-store/           # Clay by Sevgi (Seramik mağaza)
├── sedefli-store/        # Sedefli Atölye (Sedef kakma mağaza)
├── template-store/       # Yeni mağaza şablonu (deploy edilmez)
├── docker-compose.yml    # Container orkestrasyon
├── .env                  # Gizli anahtarlar (git'e dahil değil)
└── .env.example          # Ortam değişkenleri şablonu
```

## 🏪 Mağazalar

| Mağaza | Store ID | Port | Açıklama |
|--------|----------|------|----------|
| **Hobby Store** | `hobby` | `8001` | Ana mağaza — amber/sıcak tema |
| **Clay by Sevgi** | `clay` | `8002` | Seramik mağaza — stone/toprak tema |
| **Sedefli Atölye** | `sedefli` | `8003` | Sedef kakma — indigo/mavi tema |
| **Template** | — | — | Yeni mağaza oluşturmak için şablon |

Her mağaza `NEXT_PUBLIC_STORE_ID` env variable'ına göre otomatik olarak özelleşir:
- **Nav**: Mağaza adı ve font stili
- **Hero**: Özel tasarım, arka plan ve renkler
- **Footer**: Copyright bilgisi
- **Login**: Tema renkleri ve branding

## 🚀 Kurulum

### Gereksinimler
- Docker & Docker Compose
- Medusa Backend (`hobby-network` ağında çalışıyor olmalı)

### 1. Ortam Değişkenlerini Ayarla
```bash
cp .env.example .env
```
`.env` dosyasını düzenleyerek gerçek anahtarları girin.

### 2. Çalıştır
```bash
docker compose up -d --build
```

### 3. Erişim
- **Hobby Store**: http://localhost:8001
- **Clay by Sevgi**: http://localhost:8002
- **Sedefli Atölye**: http://localhost:8003

## 🆕 Yeni Mağaza Ekleme

1. `template-store/` klasörünü yeni isimle kopyala:
   ```bash
   cp -r template-store/ yeni-store/
   ```
2. `yeni-store/` içinde Dockerfile oluştur (diğerlerinden kopyalanabilir)
3. `docker-compose.yml`'e yeni servis ekle:
   ```yaml
   yeni-storefront:
     build:
       context: ./yeni-store
       dockerfile: Dockerfile
     container_name: yeni-storefront
     volumes:
       - yeni-store-node_modules:/app/node_modules
       - yeni-next-build:/app/.next
     env_file:
       - .env
     environment:
       - NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://hobby-backend:7001
       - MEDUSA_BACKEND_URL=http://hobby-backend:7001
       - NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${YENI_PUBLISHABLE_KEY}
       - NEXT_PUBLIC_STORE_ID=yeni
     ports:
       - "8004:8000"
     restart: always
     networks:
       - hobby-network
   ```
4. `volumes:` bölümüne ekle:
   ```yaml
   yeni-store-node_modules:
   yeni-next-build:
   ```
5. `src/modules/home/components/hero/index.tsx` → Yeni store için Hero tasarımı ekle
6. `src/modules/layout/templates/nav/index.tsx` → Mağaza adını ekle
7. `src/modules/layout/templates/footer/index.tsx` → Copyright güncelle
8. `src/modules/account/components/login/index.tsx` → Tema rengi ekle
9. `src/app/[countryCode]/(main)/page.tsx` → Metadata güncelle

## 🛠 Teknik Detaylar

### Docker Yapısı
- **Base Image**: `node:22-alpine` (LTS — Nisan 2027'ye kadar desteklenir)
- **Build**: Container ilk açılışta `node_modules` ve `.next` build yoksa otomatik oluşturur
- **Volumes**: `node_modules` ve `.next` named volume ile persist edilir (hızlı restart)
- **Network**: Tüm storefront'lar ortak `hobby-network` üzerinden backend'e bağlanır

### Ortam Değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_STORE_ID` | Mağaza kimliği (hero, nav, footer, login'i belirler) |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Client-side backend URL |
| `MEDUSA_BACKEND_URL` | Server-side backend URL (Docker internal) |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa Admin → API Key Management'tan alınır |
| `JWT_SECRET` | JWT token imzalama anahtarı |
| `COOKIE_SECRET` | Cookie şifreleme anahtarı |
| `BETTER_AUTH_SECRET` | Better Auth oturum anahtarı |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

## 🧹 Bakım

```bash
# Tüm container'ları durdur
docker compose down

# Volume'lar dahil sıfırla ve yeniden kur
docker compose down -v
docker compose up -d --build

# Belirli bir store'u rebuild et
docker compose up -d --build clay-storefront

# Logları izle
docker compose logs -f sedefli-storefront
```

## 🔐 Güvenlik

- `.env` dosyası `.gitignore`'da — secret'lar git'e **dahil değildir**
- `.env.example` sadece placeholder değerler içerir ve git'te güvenle tutulur
- `NEXT_PUBLIC_*` değişkenleri client-side'da görünür; sadece publishable key'ler bu prefix ile kullanılmalıdır
- JWT ve Cookie secret'ları en az 32 karakter olmalı, `openssl rand -base64 32` ile üretilebilir
- Google OAuth secret'ları [Google Cloud Console](https://console.cloud.google.com/apis/credentials)'dan yönetilir

## 📊 Güvenlik Taraması

Son tarama: **20 Şubat 2026**

| Metrik | Durum |
|--------|-------|
| Base Image | `node:22-alpine` ✅ Güncel |
| Critical | 0 |
| High | 6 (Alpine upstream — patch bekleniyor) |
| Medium | 1 |
| Low | 1 |

Tarama komutu:
```bash
docker scout recommendations <image-name>:latest
```

---

**Son Güncelleme**: 20 Şubat 2026

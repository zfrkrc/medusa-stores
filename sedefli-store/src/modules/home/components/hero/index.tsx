import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const StoreId = process.env.NEXT_PUBLIC_STORE_ID || "hobby"

const Hero = () => {
  if (StoreId === "clay") {
    return (
      <div className="h-[95vh] w-full relative bg-stone-50 flex items-center justify-center overflow-hidden">
        {/* Clay by Sevgi Design */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=2340&auto=format&fit=crop')",
          }}
        />
        <div className="relative z-10 text-center px-8">
          <Heading
            level="h1"
            className="text-6xl small:text-9xl text-stone-800 font-serif font-light tracking-widest mb-8"
          >
            Clay by Sevgi
          </Heading>
          <LocalizedClientLink href="/store">
            <button className="px-12 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white text-base font-light transition-all duration-300 shadow-lg hover:shadow-xl">
              Koleksiyonu Keşfet
            </button>
          </LocalizedClientLink>
        </div>
      </div>
    )
  }

  if (StoreId === "sedefli") {
    return (
      <div className="w-full border-b border-ui-border-base bg-stone-50 flex flex-col medium:flex-row items-stretch">
        {/* Sol: Metin — resmin yüksekliğine uzar */}
        <div className="w-full medium:w-2/5 flex flex-col justify-center items-start px-8 py-16 small:px-16 gap-6 bg-stone-50">
          <div className="w-fit px-3 py-1 rounded-full border border-stone-300 bg-amber-50 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            El Emeği • Özel Tasarım
          </div>
          <Heading
            level="h1"
            className="text-4xl small:text-5xl leading-tight text-stone-800 font-serif font-medium tracking-tight"
          >
            Sedefli Atölye
          </Heading>
          <p className="text-base small:text-lg leading-relaxed text-stone-600 font-normal max-w-sm">
            Sedef kakma sanatı ve porselen işçiliğinde ustalık.
            Her biri eşsiz, her biri özel.
          </p>
          <LocalizedClientLink href="/store">
            <button type="button" className="px-10 py-4 rounded-full bg-stone-800 hover:bg-stone-700 text-white font-medium transition-all shadow-lg hover:shadow-xl">
              Koleksiyonu Keşfet
            </button>
          </LocalizedClientLink>
        </div>
        {/* Sağ: Resim — doğal oranı, kesilmez */}
        <div className="w-full medium:w-3/5">
          <img
            src="/sedefli-login.jpg"
            alt="Sedefli Atölye"
            className="w-full block"
          />
        </div>
      </div>
    )
  }

  // Default: Hobby Store Design
  return (
    <div className="h-[85vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle flex flex-col-reverse medium:flex-row overflow-hidden">
      <div className="flex-1 flex flex-col justify-center items-start p-8 small:p-16 gap-6 z-10 bg-white medium:bg-transparent">
        <span className="flex flex-col gap-4">
          <div className="w-fit px-3 py-1 rounded-full border border-ui-border-base bg-amber-50 text-amber-900 text-xs font-semibold uppercase tracking-wider">
            Doğal & Benzersiz
          </div>
          <Heading
            level="h1"
            className="text-4xl small:text-7xl leading-tight text-ui-fg-base font-serif font-medium tracking-tight"
          >
            Hobby Store <br />
            <span className="text-amber-700">El Emeği Sanat</span>
          </Heading>
          <Heading
            level="h2"
            className="text-lg small:text-xl leading-relaxed text-ui-fg-subtle font-normal max-w-md"
          >
            Sizin için özenle seçilmiş, el yapımı benzersiz ürünlerimizi keşfedin.
          </Heading>
        </span>
        <LocalizedClientLink href="/store">
          <button className="px-10 py-4 rounded-full bg-amber-900 hover:bg-amber-800 text-white font-medium transition-all shadow-lg hover:shadow-xl">
            Koleksiyonu Keşfet
          </button>
        </LocalizedClientLink>
      </div>
      <div className="flex-1 relative h-full min-h-[400px]">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2449&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent medium:opacity-0" />
      </div>
    </div>
  )
}

export default Hero

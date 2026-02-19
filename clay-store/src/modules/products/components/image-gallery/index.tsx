import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          let normalizedUrl = image.url
          if (normalizedUrl) {
            normalizedUrl = normalizedUrl.replace("http://localhost:9000", "http://192.168.216.115:9000")
            normalizedUrl = normalizedUrl.replace("http://medusa-backend:9000", "http://192.168.216.115:9000")
            normalizedUrl = normalizedUrl.replace("http://127.0.0.1:9000", "http://192.168.216.115:9000")
          }

          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!normalizedUrl && (
                <Image
                  src={normalizedUrl}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Ürün görseli ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                  unoptimized
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery

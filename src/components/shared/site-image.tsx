import Image from "next/image";
import { siteImages, type SiteImageId } from "@/content/site-images";
import { cn } from "@/lib/utils";

interface SiteImageProps {
  id: SiteImageId;
  /** Override the manifest's default alt with context-specific copy. */
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Fill mode for aspect-ratio boxes (parent must be positioned). */
  fill?: boolean;
}

// Single wrapper so every photo gets next/image + the locally-generated blur placeholder + correct
// width/height (zero CLS) from src/content/site-images.ts (the optimized WebP manifest).
export function SiteImage({ id, alt, className, sizes, priority, fill }: SiteImageProps) {
  const image = siteImages[id];

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={alt ?? image.alt}
        fill
        sizes={sizes ?? "100vw"}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        priority={priority}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={alt ?? image.alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      priority={priority}
      className={className}
    />
  );
}

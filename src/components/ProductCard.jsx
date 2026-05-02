import { useState } from 'react'
import StarRating from './StarRating'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, index }) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)

  const finalPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
  const hasDiscount = product.discountPercentage >= 1

  const stockStatus =
    product.stock > 20 ? { label: 'In Stock', cls: styles.stockGood } :
    product.stock > 0  ? { label: `${product.stock} left`, cls: styles.stockLow } :
                         { label: 'Sold Out', cls: styles.stockNone }

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <div className={styles.imageWrap}>
        {!imgLoaded && !imgError && <div className={styles.imageSkeleton} />}
        {!imgError ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`${styles.image} ${imgLoaded ? styles.imageVisible : ''}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
          />
        ) : (
          <div className={styles.imageFallback}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
          </div>
        )}
        {hasDiscount && (
          <div className={styles.discountBadge}>
            −{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.category}>{product.category}</span>
          {product.brand && <span className={styles.brand}>{product.brand}</span>}
        </div>

        <h3 className={styles.title}>{product.title}</h3>

        <p className={styles.description}>{product.description}</p>

        <StarRating rating={product.rating} count={product.stock} />

        <div className={styles.footer}>
          <div className={styles.pricing}>
            <span className={styles.price}>${finalPrice}</span>
            {hasDiscount && (
              <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
            )}
          </div>
          <span className={`${styles.stock} ${stockStatus.cls}`}>
            {stockStatus.label}
          </span>
        </div>

        <button className={styles.cta}>
          <span>Add to Cart</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </article>
  )
}

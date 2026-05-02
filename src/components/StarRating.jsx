import styles from './StarRating.module.css'

export default function StarRating({ rating, count }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.stars}>
        {[1, 2, 3, 4, 5].map(star => {
          const fill = Math.min(1, Math.max(0, rating - (star - 1)))
          return (
            <span key={star} className={styles.star}>
              <svg width="13" height="13" viewBox="0 0 13 13">
                <defs>
                  <linearGradient id={`grad-${star}-${Math.round(rating * 10)}`}>
                    <stop offset={`${fill * 100}%`} stopColor="#B8913A" />
                    <stop offset={`${fill * 100}%`} stopColor="#D4C9B8" />
                  </linearGradient>
                </defs>
                <polygon
                  points="6.5,0.5 8.1,4.8 12.7,5.1 9.3,7.9 10.4,12.4 6.5,10 2.6,12.4 3.7,7.9 0.3,5.1 4.9,4.8"
                  fill={`url(#grad-${star}-${Math.round(rating * 10)})`}
                />
              </svg>
            </span>
          )
        })}
      </div>
      <span className={styles.score}>{rating.toFixed(1)}</span>
      {count != null && <span className={styles.count}>({count})</span>}
    </div>
  )
}

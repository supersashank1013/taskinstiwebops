import styles from './Header.module.css'

export default function Header({ total, filtered }) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <svg className={styles.logo} viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1"/>
            <path d="M10 22 L16 10 L22 22" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 18 h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span className={styles.name}>Lumière</span>
        </div>
        <div className={styles.tagline}>
          {filtered < total
            ? <><strong>{filtered}</strong> of <strong>{total}</strong> products</>
            : <><strong>{total}</strong> curated products</>
          }
        </div>
      </div>
      <div className={styles.divider} />
    </header>
  )
}

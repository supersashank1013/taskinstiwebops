import { useProducts } from './hooks/useProducts'
import Header from './components/Header'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'
import styles from './App.module.css'

function SkeletonCard() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skelImg} />
      <div className={styles.skelBody}>
        {[60, 85, 100, 70, 50].map((w, i) => (
          <div key={i} className={styles.skelLine} style={{ width: `${w}%`, height: i === 1 ? 18 : 12 }} />
        ))}
      </div>
    </div>
  )
}

function EmptyState({ search, category }) {
  return (
    <div className={styles.empty}>
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        <path d="M8 11h6M11 8v6"/>
      </svg>
      <p className={styles.emptyTitle}>No products found</p>
      <p className={styles.emptySub}>
        {search ? `No results for "${search}"` : `Nothing in "${category}" yet`}
      </p>
    </div>
  )
}

export default function App() {
  const {
    products, filtered, categories,
    loading, error,
    search, setSearch,
    category, setCategory,
    sortBy, setSortBy,
  } = useProducts()

  return (
    <div className={styles.app}>
      <Header total={products.length} filtered={filtered.length} />

      <Filters
        categories={categories}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <main className={styles.main}>
        {error && (
          <div className={styles.error}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Failed to load products — {error}
          </div>
        )}

        {!error && loading && (
          <div className={styles.grid}>
            {Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {!error && !loading && filtered.length === 0 && (
          <EmptyState search={search} category={category} />
        )}

        {!error && !loading && filtered.length > 0 && (
          <>
            <div className={styles.grid}>
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            <footer className={styles.footer}>
              <div className={styles.footerDivider} />
              <p>Lumière — {filtered.length} products displayed</p>
            </footer>
          </>
        )}
      </main>
    </div>
  )
}

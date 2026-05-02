import { useState, useEffect, useMemo } from 'react'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [sortBy, setSortBy] = useState('default')

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=100')
      .then(r => { if (!r.ok) throw new Error('Network error'); return r.json() })
      .then(data => { setProducts(data.products); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))]
    return ['all', ...cats.sort()]
  }, [products])

  const filtered = useMemo(() => {
    let result = [...products]
    if (category !== 'all') result = result.filter(p => p.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.brand || '').toLowerCase().includes(q)
      )
    }
    switch (sortBy) {
      case 'price-asc':  return result.sort((a, b) => a.price - b.price)
      case 'price-desc': return result.sort((a, b) => b.price - a.price)
      case 'rating':     return result.sort((a, b) => b.rating - a.rating)
      case 'discount':   return result.sort((a, b) => b.discountPercentage - a.discountPercentage)
      default:           return result
    }
  }, [products, category, search, sortBy])

  return { products, filtered, categories, loading, error, search, setSearch, category, setCategory, sortBy, setSortBy }
}

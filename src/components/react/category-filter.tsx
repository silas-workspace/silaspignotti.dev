import { useState } from 'react'
import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: readonly ['All', 'Geospatial', 'AI/Automation']
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const handleFilter = (category: string) => {
    setActiveCategory(category)
    
    const items = document.querySelectorAll('.project-item')
    items.forEach((item) => {
      const el = item as HTMLElement
      const itemCategory = el.dataset.category
      if (category === 'All' || itemCategory === category) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    })
  }

  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={cn(
            'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200',
            'border border-border/60',
            activeCategory === category
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

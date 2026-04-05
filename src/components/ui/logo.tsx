import { cn } from "@/lib/utils"

function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "w-full h-auto text-neutral-900 dark:text-neutral-100 transition-colors duration-300",
        className
      )}
      role="img"
      aria-label="Silas Pignotti Logo"
      aria-hidden="true"
      focusable="false"
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="3" fill="none" />
      
      {/* Globe lines (representing geospatial) */}
      <ellipse cx="32" cy="32" rx="12" ry="28" stroke="currentColor" stroke-width="2" fill="none" />
      <line x1="4" y1="32" x2="60" y2="32" stroke="currentColor" stroke-width="2" />
      <path d="M 8 20 Q 32 24 56 20" stroke="currentColor" stroke-width="1.5" fill="none" />
      <path d="M 8 44 Q 32 40 56 44" stroke="currentColor" stroke-width="1.5" fill="none" />
      
      {/* Neural node dots (representing AI/ML) */}
      <circle cx="32" cy="18" r="3" fill="currentColor" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
      <circle cx="32" cy="46" r="3" fill="currentColor" />
      
      {/* Connection lines from neural nodes */}
      <line x1="32" y1="21" x2="32" y2="29" stroke="currentColor" stroke-width="1.5" />
      <line x1="32" y1="35" x2="32" y2="43" stroke="currentColor" stroke-width="1.5" />
    </svg>
  )
}

export default Logo

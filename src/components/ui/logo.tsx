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
      aria-label="Logo"
      aria-hidden="true"  
      focusable="false"
    >
      <rect x="2" y="2" width="60" height="60" rx="14" stroke="currentColor" stroke-width="4" fill="none" />
      <text
        x="32"
        y="39"
        text-anchor="middle"
        font-size="24"
        font-family="ClashDisplay, sans-serif"
        font-weight="700"
        fill="currentColor"
      >
        SP
      </text>
    </svg>
  )
}

export default Logo

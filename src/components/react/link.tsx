import React from 'react'
import { cn } from '@/lib/utils'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
  underline?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, external, underline, className, children, ...props }, ref) => {
    const isExternal = external || href.startsWith('http') || href.startsWith('https')
    
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'transition-colors duration-200',
          underline && 'underline underline-offset-4',
          className
        )}
        {...(isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'

export default Link

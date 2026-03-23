const EXTERNAL_PROTOCOLS = /^(?:[a-z]+:)?\/\//i

export function withBasePath(path?: string) {
  if (!path || path === '#' || EXTERNAL_PROTOCOLS.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }

  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (normalizedPath.startsWith(`${base}/`) || normalizedPath === base) {
    return normalizedPath
  }

  return `${base}${normalizedPath}`
}

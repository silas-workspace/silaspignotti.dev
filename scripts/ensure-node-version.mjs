const major = Number.parseInt(process.versions.node.split('.')[0] ?? '0', 10)

if (major < 22 || major >= 23) {
  console.error(
    `Unsupported Node.js version ${process.versions.node}. Use Node 22.x (project standard) to run build/check reliably.`
  )
  process.exit(1)
}

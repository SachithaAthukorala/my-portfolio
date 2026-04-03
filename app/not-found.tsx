import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-700 flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="font-serif text-8xl text-accent-400/20 font-bold mb-6">404</p>
        <h1 className="font-serif text-3xl text-white mb-3">Page not found</h1>
        <p className="text-navy-200 mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/works" className="btn-outline">View Works</Link>
        </div>
      </div>
    </div>
  )
}

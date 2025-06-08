import { useEffect, useState } from 'react'

export const useIntersectionObserver = () => {
  const [inView, setInView] = useState(false)
  const [node, setNode] = useState<Element | null>(null)

  useEffect(() => {
    if (node) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setInView(entry.isIntersecting)
        },
        {
          threshold: 0.1,
          rootMargin: '100px',
        }
      )

      observer.observe(node)

      return () => {
        observer.disconnect()
      }
    }
  }, [node])

  return { ref: setNode, inView }
}

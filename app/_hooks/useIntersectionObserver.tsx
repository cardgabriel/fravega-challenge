import { useEffect, useRef, useState } from 'react'

// Custom hook to track when an element enters the viewport
export const useIntersectionObserver = () => {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.1,
    })

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  // Return both the ref and the inView state
  return { ref, inView }
}

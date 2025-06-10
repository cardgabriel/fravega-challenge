import { formatDate } from '@/app/_lib/dateUtils'

describe('dateUtils', () => {
  it('should format date in short format', () => {
    const date = '2024-03-15T10:30:00Z'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('Mar 15, 2024')
  })

  it('should handle different date inputs', () => {
    const date = '2023-12-31T12:00:00Z'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('Dec 31, 2023')
  })
})

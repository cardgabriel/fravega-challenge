import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mock simple de un componente para testear
function TestComponent() {
  return (
    <div>
      <h1>Hello World</h1>
      <p>This is a test component</p>
    </div>
  )
}

describe('Example Test', () => {
  it('renders hello world', () => {
    render(<TestComponent />)

    const heading = screen.getByRole('heading', { name: /hello world/i })
    expect(heading).toBeInTheDocument()

    const paragraph = screen.getByText(/this is a test component/i)
    expect(paragraph).toBeInTheDocument()
  })

  it('performs a simple calculation', () => {
    const result = 2 + 2
    expect(result).toBe(4)
  })

  it('tests array contains value', () => {
    const array = ['apple', 'banana', 'orange']
    expect(array).toContain('banana')
    expect(array).toHaveLength(3)
  })
})

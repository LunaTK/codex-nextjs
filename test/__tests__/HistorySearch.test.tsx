import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import StockSearchPage from '@/app/stocks/page'
import { server } from '../server'
import { http, HttpResponse } from 'msw'

it('can change symbol after searching history', async () => {
  const symbols: string[] = []
  server.use(
    http.get('/api/stocks/history', ({ request }) => {
      const url = new URL(request.url)
      symbols.push(url.searchParams.get('symbol')!)
      return HttpResponse.json({ data: [] })
    })
  )

  render(<StockSearchPage />)

  const input = screen.getByPlaceholderText(/enter symbol/i)
  const searchHistory = screen.getByText(/search history/i)

  fireEvent.change(input, { target: { value: 'AAA' } })
  fireEvent.click(searchHistory)
  await waitFor(() => expect(symbols).toHaveLength(1))

  fireEvent.change(input, { target: { value: 'BBB' } })
  await waitFor(() => expect(input).toHaveValue('BBB'))
  fireEvent.click(searchHistory)
  await waitFor(() => expect(symbols).toHaveLength(2))

  expect(symbols).toEqual(['AAA', 'BBB'])
})

it('can update period with same symbol', async () => {
  const fromValues: string[] = []
  server.use(
    http.get('/api/stocks/history', ({ request }) => {
      const url = new URL(request.url)
      fromValues.push(url.searchParams.get('from')!)
      return HttpResponse.json({ data: [] })
    })
  )

  render(<StockSearchPage />)

  const input = screen.getByPlaceholderText(/enter symbol/i)
  const fromInput = screen.getByLabelText(/from/i)
  const searchHistory = screen.getByText(/search history/i)

  fireEvent.change(input, { target: { value: 'AAA' } })
  fireEvent.click(searchHistory)
  await waitFor(() => expect(fromValues).toHaveLength(1))

  fireEvent.change(fromInput, { target: { value: '2024-01-02T00:00' } })
  await waitFor(() => expect(fromInput).toHaveValue('2024-01-02T00:00'))
  fireEvent.click(searchHistory)
  await waitFor(() => expect(fromValues).toHaveLength(2))

  expect(fromValues[1]).toBe('2024-01-02T00:00')
})

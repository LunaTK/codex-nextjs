import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/stocks', () => {
    return HttpResponse.json({
      ticker: 'AAPL',
      close: 123,
    })
  }),
  http.get('/api/stocks/history', () => {
    return HttpResponse.json({
        data: [
          {
            timestamp: '2024-01-01 10:00:00',
            open: 1,
            high: 2,
            low: 0.5,
            close: 1.5,
            volume: 1000,
          },
        ],
      })
  }),
]

export const server = setupServer(...handlers)

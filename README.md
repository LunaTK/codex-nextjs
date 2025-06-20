This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Stock Price API

This project exposes a simple endpoint to fetch current U.S. stock prices.

Send a GET request to `/api/stocks?symbol=SYMBOL` where `SYMBOL` is the stock ticker. The data is retrieved from the free [Stooq](https://stooq.com/) service and returned as JSON.

Example:

```bash
curl http://localhost:3000/api/stocks?symbol=AAPL
```

You can also test it in the browser by visiting `/stocks` and searching for a ticker symbol.

## Stock Price History API

Fetch historical prices by sending a GET request to `/api/stocks/history` with the following query parameters:

- `symbol` – stock ticker symbol (required)
- `from` – start date/time in ISO format (required)
- `to` – end date/time in ISO format (required)
- `unit` – data granularity: `5min`, `1hour`, or `day` (defaults to `day`)

Example:

```bash
curl "http://localhost:3000/api/stocks/history?symbol=IBM&from=2025-05-01&to=2025-05-10&unit=day"
```

The API uses [Alpha Vantage](https://www.alphavantage.co/) under the hood. Set the `ALPHAVANTAGE_API_KEY` environment variable to use your own key; otherwise the `demo` key is used with limited data.

## Running Tests

Component tests are written with [Vitest](https://vitest.dev) and use [Mock Service Worker](https://mswjs.io) to stub network requests. Run them with:

```bash
pnpm test
```

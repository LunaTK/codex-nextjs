import { render, screen } from "@testing-library/react";
import StockPriceWidget from "@/components/stock-price-widget";

it("renders price from mocked API", async () => {
  render(<StockPriceWidget symbol="AAPL" />);
  expect(await screen.findByText(/AAPL: 123/)).toBeInTheDocument();
});

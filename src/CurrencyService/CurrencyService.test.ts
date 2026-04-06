import { convertCurrency } from "./CurrencyService"
import { test, expect, jest } from "@jest/globals"

global.fetch = jest.fn() as any

test("should convert currency correctly", async () => {
//nao entetendo esse codigo
  (fetch as any).mockResolvedValue({
    json: async () => ({
      rates: {
        BRL: 5
      }
    })
  })

  const result = await convertCurrency({
    amount: 10,
    fromCurrency: "USD",
    toCurrency: "BRL"
  })

  expect(result.convertedAmount).toBe(50)

})
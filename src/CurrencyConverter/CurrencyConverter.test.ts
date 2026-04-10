/*import { CurrencyConverter } from "../CurrencyConverter/CurrencyConverter"
import { convertCurrency } from "../CurrencyService/CurrencyService"

jest.mock("../CurrencyService/CurrencyService")

describe("CurrencyConverter", () => {

  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  test("should convert currency and save to history", async () => {

    const mockResult = {
      from: "USD",
      to: "BRL",
      amount: 10,
      result: 50
    }

    ;(convertCurrency as jest.Mock).mockResolvedValue(mockResult)

    const converter = new CurrencyConverter()

    const result = await converter.convert({
    fromCurrency: "USD",
    toCurrency: "BRL",
    amount: 10
    })

    expect(result).toEqual(mockResult)

    expect(convertCurrency).toHaveBeenCalled()

    expect(converter.getHistory()).toHaveLength(1)
  })
})
  */
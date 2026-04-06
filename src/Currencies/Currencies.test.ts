import { populateCurrencySelect } from "./Currencies"
test("should return formatted currencies", () => {
  const result = populateCurrencySelect()
  expect(result).toContainEqual({
    code: "USD",
    symbol: "$",
    flag: "us"
  })
  expect(result).toContainEqual({
    code: "BRL",
    symbol: "R$",
    flag: "br"
  })

})
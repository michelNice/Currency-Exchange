import type { CurrencyConversionRequest,CurrencyConversionResult } from "../Types/Types";
export async function convertCurrency(
  request: CurrencyConversionRequest
): Promise<CurrencyConversionResult>{
    try{
    const url = "https://api.exchangerate-api.com/v4/latest/";

    const response = await fetch(`${url}${request.fromCurrency}`)

    if(!response.ok){
        throw new Error('Failed to fetch currency')
    }
     const data: any = await response.json()

      const rate = data.rates[request.toCurrency]

      if(!rate){
          throw new Error(request.toCurrency)
      }
       const convertedAmount = request.amount * rate

      return{
          originalAmount: request.amount,
          convertedAmount: convertedAmount,
          fromCurrency: request.fromCurrency,
          toCurrency: request.toCurrency,
          exchangeRate: rate,
          date: new Date().toISOString()
       }
    }catch(error){
        throw error
    }
}
import type { currencyConversionRequest,currencyConversionResult } from "../Types/Types";

export async function convertCurrency(
  request: currencyConversionRequest
): Promise<currencyConversionResult>{
    try{

    const url = "https://api.exchangerate-api.com/v4/latest/";

    const response = await fetch(`${url} ${request.fromCurrency}`)

      const data = await response.json()

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
        console.log(error)
        throw error
    }
}
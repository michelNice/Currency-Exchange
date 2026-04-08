import { convertCurrency } from '../CurrencyService/CurrencyService'
import type { CurrencyConversionRequest,CurrencyConversionResult } from '../Types/Types'

export class CurrencyConverter {
 
    private history:CurrencyConversionResult[] = []

    constructor(){
      const data =   localStorage.getItem("history")

      this.history = data ? JSON.parse(data): [];
    }
    async convert(
    request: CurrencyConversionRequest
   ): Promise<CurrencyConversionResult> {

    const result = await convertCurrency(request)

    this.history.push(result)

    this.saveHistory()

    console.log(result)

    return result
  }
  private saveHistory(){
        localStorage.setItem("history",JSON.stringify(this.history))
  }
  getHistory():CurrencyConversionResult[]{
        return  this.history
  }
}





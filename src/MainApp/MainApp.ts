import { convertCurrency} from "../CurrencyService/CurrencyService";

export async function convertExemples(){
    try{
      const result = await convertCurrency({
      amount:100,
      fromCurrency:"USD",
      toCurrency:"BRL"
    })

    return result

    }catch(error){
        throw error
    }
}
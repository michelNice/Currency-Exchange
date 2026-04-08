export function populateCurrencySelect(){
    const currencyList = {
      USD:{symbol:'$',flag:'us'},
      EUR:{symbol:'€',flag:'eu'},
      GBP:{symbol:'£',flag:'gb'},
      BRL:{symbol:'R$',flag:'br'},
      JPY:{symbol:'¥',flag:'jp'},
      CAD:{symbol:'C$',flag:'ca'},
      AUD:{symbol:'A$',flag:'au'},
      CHF:{symbol:'CHF',flag:'ch'},
      CNY:{symbol:'¥',flag:'cn'},
      RUB:{symbol:'₽',flag:'ru'}
  }
     return Object.entries(currencyList).map(([code,currency])=>{
        return {
         code,
         symbol: currency.symbol,
         flag:currency.flag
        }
   })
}
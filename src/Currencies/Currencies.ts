export function populateCurrencySelect(){
    const currencyList = {
      USD:{name:'United States dollar',symbol:'$',flag:'us'},
      EUR:{name:'Euro',symbol:'€',flag:'eu'},
      GBP:{name:'Pound sterling',symbol:'£',flag:'gb'},
      BRL:{name:'Brazilian Real',symbol:'R$',flag:'br'},
      JPY:{name:'Japanese Yen',symbol:'¥',flag:'jp'},
      CAD:{name:'Canadian Dollar',symbol:'C$',flag:'ca'},
      AUD:{name:'Australian Dollar',symbol:'A$',flag:'au'},
      CHF:{name:'Swiss Franc',symbol:'CHF',flag:'ch'},
      CNY:{name:'Chinese Yuan',symbol:'¥',flag:'cn'},
      RUB:{name:'Russian Ruble',symbol:'₽',flag:'ru'}
  }
     return Object.entries(currencyList).map(([code,currency])=>{
        return {
         code,
         symbol: currency.symbol,
         flag:currency.flag
        }
   })
}
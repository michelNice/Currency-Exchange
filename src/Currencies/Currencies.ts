export function populateCurrencySelect(){
    const currencyList = {
    USD:{name:'United States dollar',symbol: '$',value:1.0},
    EUR: { name: "Euro", symbol: "€", value: 0.92 },
    GBP: { name: "Pound sterling", symbol: "£", value: 0.80 },
    BRL: { name: "Brazilian Real", symbol: "R$", value: 5.00 },
    JPY: { name: "Japanese Yen", symbol: "¥", value: 150.00 },
    CAD: { name: "Canadian Dollar", symbol: "C$", value: 1.35 },
    AUD: { name: "Australian Dollar", symbol: "A$", value: 1.50 },
    CHF: { name: "Swiss Franc", symbol: "CHF", value: 0.90 },
    CNY: { name: "Chinese Yuan", symbol: "¥", value: 7.20 },
    RUB: { name: "Russian Ruble", symbol: "₽", value: 90.00 }
    }
     return Object.entries(currencyList).map(([code,currency])=>{
        return {
         code,
         symbol: currency.symbol
        }
   })
}
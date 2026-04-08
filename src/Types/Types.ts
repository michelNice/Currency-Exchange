export interface CurrencyConversionRequest{
    fromCurrency:string;
    toCurrency:string;
    amount:number;
}

export interface CurrencyConversionResult{
    originalAmount:number;
    convertedAmount:number;
    fromCurrency:string;
    toCurrency:string;
    exchangeRate:number;
    date:string
}
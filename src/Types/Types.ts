export interface currencyConversionRequest{
    fromCurrency:string;
    toCurrency:string;
    amount:number;
}

export interface currencyConversionResult{
    originalAmount:number;
    convertedAmount:number;
    fromCurrency:string;
    toCurrency:string;
    exchangeRate:number;
    date:string
}
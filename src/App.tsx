import { useEffect, useState } from 'react'
import {populateCurrencySelect} from '../src/Currencies/Currencies'
import { CurrencyConverter } from './CurrencyConverter/CurrencyConverter'
import Select from "react-select"
function App() {
  type option = {
    value: string
    label: React.ReactNode
  }
  const [value, setValue] = useState<string>('0,00')
  const [fromCurrency, setFromCurrency] = useState<option | null>(null)
  const [toCurrency, setToCurrency] = useState<option | null>(null)
  const [result,setResult] = useState<string>('0,00')
  const [showAmount,setShowAmount]  = useState<string>('0,00')
  const [showTo,setShowTo] = useState<string>('')
  const [showFrom,setShowFrom] = useState<string>('')
  const [showError, setShowError] = useState<string>('')

  function formatCurrency(value:number){
    const formatter = new Intl.NumberFormat('pt-BR', {
       minimumFractionDigits:2,
       maximumFractionDigits:2
    })
    return formatter.format(value)
  }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       setValue(e.target.value);

       const formatter = new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits:2,
         maximumFractionDigits:2
       })

      const digits =  e.target.value.replace(/\D/g, '')
      const cents = parseInt(digits,10) || 0

      const formatterValeu =  formatter.format(cents / 100)

      setValue(formatterValeu)
  };

  const handleConvert = async function (){
     const convertValue = new CurrencyConverter()
   const amount = Number(value.replace(/\./g, "").replace(",", "."))
     const Converted = await convertValue.convert({
      
        fromCurrency:fromCurrency!.value,
        toCurrency:toCurrency!.value,
        amount
     })

      setResult(formatCurrency(Converted.convertedAmount))
      setShowAmount(formatCurrency(Converted.originalAmount))
      setShowTo(Converted.toCurrency)
      setShowFrom(Converted.fromCurrency)

      return Converted

  }
  const convertBtn = async()=> {
    
      const Converted = await  handleConvert()

        if(!Converted.convertedAmount ||isNaN(Converted.convertedAmount)){
          setShowError('Enter a valid value greater than 0')
          return 
        }
        setShowError('')

        console.log('ERROR:', showError)

    }
  const swapBtn = async()=> {
    setToCurrency(fromCurrency)

    setFromCurrency(toCurrency)

   handleConvert()

    
  }

  let currencies = populateCurrencySelect()


  useEffect(()=> {
    if(options.length >= 2){
      setFromCurrency(options[0])
      setToCurrency(options[1])
    }
  }, [])

 const options: option[] = currencies.map((c) => ({
  value: c.code,
  label: (
    <div style={{ display: "flex", gap: "8px" }}>
      <span className={`fi fi-${c.flag}`}></span>
      {c.code} - {c.symbol}
    </div>
  )

}))

  return (
      <>
      <div className="container_currency">
        <h1>Currency Converter</h1>
         <div className="container">
              <div className="currency_box">
                   <label htmlFor="amount">Amount</label>
                   <input onChange={handleChange} id="amount" type="text" value={value} placeholder="0.00"></input>
              </div>
              <div className="currency_box">
                  <label htmlFor="from">From</label>
                  <Select className="select"  classNamePrefix="select" value={fromCurrency}options={options}onChange={(selected) => setFromCurrency(selected)}/>
              </div>
               <button id="swap" type="button" onClick={swapBtn}>
                 <i className="fa-solid fa-right-left"></i>
              </button>
       <div className="currency_box">
         <label htmlFor="to">To</label>
         <Select className="select" classNamePrefix="select"value={toCurrency}options={options}onChange={(selected) => setToCurrency(selected)}/>
      </div>


     <div className="box_button">
      <button id="convert" type="button" onClick={convertBtn}>
        <i className="fa-solid fa-rotate-right"></i>
      </button>
    </div>
    </div>
      <h2>Exchange result</h2>
       <div className="error">{showError}</div>
         <div className="box_result">

    <div className="box_item">
      <div>From: <span id="fromText">{showFrom}</span></div>
      <div>Original amount: <span id="amountText">{showAmount}</span></div>
    </div>
   
    <div className="box_item">
      <div>To: <span id="toText">{showTo}</span></div>
      <div>Result: <span id="result">{result}</span></div>
    </div>

  </div>
      </div>
  </>
  )
}

export default App

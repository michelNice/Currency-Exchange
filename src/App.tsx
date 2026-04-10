import { useEffect, useState } from 'react'
import {populateCurrencySelect} from '../src/Currencies/Currencies'
import { CurrencyConverter } from './CurrencyConverter/CurrencyConverter'
import Select from "react-select";
import type { CurrencyConversionResult } from './Types/Types';
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
  const [loading, setLoading] = useState(false)
  const [history,setHistory] = useState<CurrencyConversionResult[]>([])

  useEffect(()=> {
    const converter = new CurrencyConverter()
    setHistory(converter.getHistory())
  },[])


  function formatCurrency(value:number){
    const formatter = new Intl.NumberFormat('pt-BR', {
       minimumFractionDigits:2,
       maximumFractionDigits:2
    })
    return formatter.format(value)
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const inputValue = e.currentTarget.value

  setValue(inputValue)

  const formatter = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  const digits = inputValue.replace(/\D/g, '')
  const cents = parseInt(digits, 10) || 0

  const formattedValue = formatter.format(cents / 100)

  setValue(formattedValue)
}

  const handleConvert = async (from?: option, to?: option) => {
  const currentFrom = from || fromCurrency
  const currentTo = to || toCurrency

  if (!currentFrom || !currentTo) return

  try {
    setLoading(true)
    const convertValue = new CurrencyConverter()
    const start = Date.now()
    const amount = Number(value.replace(/\./g, "").replace(",", "."))

    const Converted = await convertValue.convert({
      fromCurrency: currentFrom.value,
      toCurrency: currentTo.value,
      amount
    })

    setResult(formatCurrency(Converted.convertedAmount))
    setShowAmount(formatCurrency(Converted.originalAmount))
    setShowTo(Converted.toCurrency)
    setShowFrom(Converted.fromCurrency)

    const elapsed = Date.now() - start
    if (elapsed < 500) await new Promise(r => setTimeout(r, 500 - elapsed))

    setShowError('')
    return Converted
  } catch (error) {
    setShowError('Ocorreu um erro na conversão')
    return null
  } finally {
    setLoading(false)
  }
}
  const convertBtn = async()=> {
    
      const Converted = await  handleConvert()

        if (!Converted || !Converted.convertedAmount || isNaN(Converted.convertedAmount)) {
           setShowError('Enter a valid value greater than 0')
          return
        }

        const converter = new CurrencyConverter()
        setHistory(converter.getHistory())

        setShowError('')
    }
  const swapBtn = async()=> {
     if (!fromCurrency || !toCurrency) return

  const newFrom = toCurrency
  const newTo = fromCurrency
    await handleConvert(toCurrency,fromCurrency)
  setFromCurrency(newFrom)
  setToCurrency(newTo)

  
  }

  let currencies = populateCurrencySelect()

  const options: option[] = currencies.map((c) => ({
  value: c.code,
  label: (
    <div style={{ display: "flex", gap: "8px" }}>
      <span className={`fi fi-${c.flag}`}></span>
      {c.code} - {c.symbol}
    </div>
  )

}))


  useEffect(()=> {
    if(options.length >= 2){
      setFromCurrency(options[0])
      setToCurrency(options[1])
    }
  }, [])

 

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
                  <Select isSearchable={false} className="select"  classNamePrefix="select" value={fromCurrency}options={options}onChange={(selected) => setFromCurrency(selected)}/>
              </div>
               <button id="swap" type="button" onClick={swapBtn}>
                 <i className="fa-solid fa-right-left"></i>
              </button>
       <div className="currency_box">
         <label htmlFor="to">To</label>
         <Select   isSearchable={false} className="select" classNamePrefix="select"value={toCurrency}options={options}onChange={(selected) => setToCurrency(selected)}/>
      </div>


     <div className="box_button">
      <button id="convert" type="button" onClick={convertBtn} disabled={loading}>
        {loading ? ( <i className="fa-solid fa-spinner fa-spin"></i>) :  <i className="fa-solid fa-rotate-right"></i>}
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

  {history.length > 0 && (
  <>
    <h2>Conversion history</h2>

    <div className="history">
      {history.slice(-3).reverse().map((item, index) => (
        <div key={index} className="history_item">
          <div className="history_from">
            {formatCurrency(item.originalAmount)} {item.fromCurrency}
          </div>

          <div className="history_arrow">→</div>

          <div className="history_to">
            {formatCurrency(item.convertedAmount)} {item.toCurrency}
          </div>
        </div>
      ))}
    </div>
  </>
)}
  </>
  )
}

export default App

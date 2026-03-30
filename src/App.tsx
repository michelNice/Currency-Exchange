import { useEffect, useState } from 'react'
import {populateCurrencySelect} from '../src/Currencies/Currencies'
import { convertCurrency } from './CurrencyService/CurrencyService'
import Select from "react-select"
function App() {
  type option = {
    value: string
    label: React.ReactNode
  }
  const [value, setValue] = useState('0,00')
  const [fromCurrency, setFromCurrency] = useState<option | null>(null)
  const [toCurrency, setToCurrency] = useState<option | null>(null)

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

  const convertBtn = async()=> {


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
                  <Select id='from' value={fromCurrency} options={options} onChange={(selected)=> setFromCurrency(selected)}/>
              </div>
               <button id="swap" type="button" onClick={convertBtn}>
                 <i className="fa-solid fa-right-left"></i>
              </button>
       <div className="currency_box">
         <label htmlFor="to">To</label>
          <Select id='from' value={toCurrency} options={options}  onChange={(selected) => setToCurrency(selected)}/>
      </div>


     <div className="box_button">
      <button id="convert" type="button">
        <i className="fa-solid fa-rotate-right"></i>
      </button>
    </div>

    </div>
      </div>
  </>
  )
}

export default App

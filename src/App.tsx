import { useState } from 'react'
import {populateCurrencySelect} from '../src/Currencies/Currencies'
import { convertCurrency } from './CurrencyService/CurrencyService'

function App() {

  return (
      <>
      <div className="container_currency">
        <h1>Currency Converter</h1>
         <div className="container">
              <div className="currency_box">
                   <label htmlFor="amount">Amount</label>
                   <input id="amount" type="text" placeholder="0.00"></input>
              </div>
              <div className="currency_box">
                  <label htmlFor="from">From</label>
                  <select id="from"></select> 
              </div>
          <button id="swap" type="button">
             <i className="fa-solid fa-right-left"></i>
          </button>
       <div className="currency_box">
         <label htmlFor="to">To</label>
         <select id="to"></select> 
      </div>
    </div>
      </div>
      </>
  )
}

export default App

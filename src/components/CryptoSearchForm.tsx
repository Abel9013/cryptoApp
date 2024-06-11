import { ChangeEvent, FormEvent, useState } from "react"
import { useCryptoStore } from "../store"
import { currencies } from "../data"
import { Pair } from "../types"
import ErrorMesage from "./ErrorMesage"

export default function CryptoSearchForm() {
    const cryptoCurrencies =useCryptoStore((state)=>state.cryptoCurrencies)
    const fetchData =useCryptoStore((state)=>state.fetchData)
    const [pair, setPair] = useState<Pair>({
        currency:"",
        cryptoCurrency:""
    })
    const [error, setError] = useState("")
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setPair({
            ...pair,
            [e.target.name] : e.target.value 
        })
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        if(Object.values(pair).includes("")){
            setError("All fields are mandatory")
            return
        }
        setError("")
        // Consultar api
        fetchData(pair)


    }

    return (
    <form 
        className="form"
        onSubmit={handleSubmit }
    >
        {error && <ErrorMesage>{error}</ErrorMesage>}
        <div className="field">
            <label htmlFor="currency">Currency</label>
            <select name="currency"
                    id="currency"
                    value={pair.currency}
                    onChange={handleChange}
            >  
                    <option value="">--Choose--</option>
                    {currencies.map(currency=>(
                        <option value={currency.code} key={currency.code}>{currency.name}</option>
                    ))}
            </select>
        </div>
        <div className="field">
            <label htmlFor="cryptoCurrency">cryptoCurrency</label>
            <select 
                name="cryptoCurrency" 
                id="cryptoCurrency"
                onChange={handleChange}
                value={pair.cryptoCurrency}
            >  
                    <option value="">--Choose--</option>
                    {cryptoCurrencies.map(crypto=>(
                        <option key={crypto.CoinInfo.Name} value={crypto.CoinInfo.Name}>
                            {crypto.CoinInfo.FullName}
                        </option>
                    ))}
            </select>
        </div>
        <input type="submit" value="Quote" />
    </form>
  )
}

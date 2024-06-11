import { useMemo } from "react"
import { useCryptoStore } from "../store"
import Spinner from "./Spinner"

export default function CryptoPriceDisplay() {
  const result = useCryptoStore((state)=> state.result)
  const loading = useCryptoStore((state)=> state.loading)
  const hasresult = useMemo(()=>!Object.values(result).includes(""),[result])
    return (
    <div className="result-wrapper">
        {loading ? <Spinner/>: hasresult  &&  (
            <>
                <h2>Currency Quote</h2>
                <div className="result">
                    <img src={`https://cryptocompare.com/${result.IMAGEURL}`} alt="crypto image" />
                    <div>
                        <p>The price is: <span>{result.PRICE}</span> </p>
                        <p>Highest Value of the Day is: <span>{result.HIGHDAY}</span> </p>
                        <p>Lowest Value of the Day is: <span>{result.LOWDAY}</span> </p>
                        <p>Changes in the Last 24 Hours <span>{result.CHANGEPCT24HOUR}</span> </p>
                        <p>Last Updated<span>{result.LASTUPDATE}</span> </p>
                    </div>
                </div>    
            </>    
        )}
    </div>
  )
}


export default function CryptoSearchForm() {
  return (
    <form className="form">
        <div className="field">
            <label htmlFor="currency">Currency</label>
            <select 
                name="currency" 
                id="currency">  
                    <option value="">--Choose--</option>
            </select>
        </div>
        <div className="field">
            <label htmlFor="cryptoCurrency">cryptoCurrency</label>
            <select 
                name="cryptoCurrency" 
                id="cryptoCurrency">  
                    <option value="">--Choose--</option>
            </select>
        </div>
        <input type="submit" value="Quote" />
    </form>
  )
}

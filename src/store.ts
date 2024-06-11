import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { CryptoCurrency, Pair, CryptoPrice } from "./types"
import { getCryptos, fetchCurrentCryptoPrice } from "./services/CryptoService"

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair:Pair) => Promise<void>
}
  
export const useCryptoStore = create<CryptoStore>()(devtools((set)=> ({
    // Estas funciones son acciones
    // Aca modifico el state(tengo state y funciones que lo modifican juntas), a diferencia de useReducer donde en la parte superior definiamos las acciones y su pilot y en la parte inferior solo logica 
    cryptoCurrencies:[],
    result:{
        IMAGEURL: "",
        PRICE: "",
        HIGHDAY: "",
        LOWDAY: "",
        CHANGEPCT24HOUR: "",
        LASTUPDATE: "",
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptoCurrencies = await getCryptos()
        set(()=>({
            cryptoCurrencies
        }))
    },
    fetchData: async (pair)=> {
       set(()=>({
            loading: true
       }))
        const result = await fetchCurrentCryptoPrice(pair)
       set(()=>({
            result,
            loading: false
       }))
    }
})))


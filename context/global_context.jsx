import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getData, setData, getAllKey } from "../hooks/useDataQuery";
const GlobalContext = createContext()

export default function GlobalContextProvider({children}){
    
    const [data_note, setData_note] = useState([])

    /**
     * @typedef {{name : string, ville : string}} user
     * @param {{content : string, createdAt : number, createdBy : user, epingler : boolean, published : boolean, id : string}} someData 
     */
    const SaveData = useCallback((someData) => {
        const index = data_note.findIndex(el => el.id === someData.id)
        if( index === -1) {
            setData_note(prev => [...prev, someData])
        } else {
            setData_note(prev => prev.fill(someData, index, index+1))
            setData(someData)
            console.log(data_note, index)
        }
    }, [data_note])

    const getNote = async () => {
        const data = await getAllKey()
        setData_note(data)
    }

    useEffect(() => {
        getNote()
    }, [])

    return(
        <GlobalContext.Provider value={{data_note, SaveData}}>
            {children}
        </GlobalContext.Provider>
    )
}

/**
 * @returns {{ data_note : Array<any>, SaveData : (value) => React.Dispatch<[]>}}
 */
export const useGlobalContext = () => useContext(GlobalContext)
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getData, setData, getAllKey } from "../hooks/useDataQuery";
const GlobalContext = createContext()

export default function GlobalContextProvider({children}){
    
    const [data_note, setData_note] = useState([])

    
    const SaveData = useCallback(
        /**
         * @typedef {{name : string, userId : string, }} USER
         * @param {{note_content : string, createdAt : number, createdBy : USER, epingler : boolean, published : boolean, noteId : string, userId : string}} someData 
         */
        (someData) => {
        const element = data_note.filter((el) => el.noteId === someData.noteId)
        if(element.length === 0) {
            setData_note(prev => [...prev, someData])
        } else {
            const otherElement = data_note.filter((el) => el.noteId !== someData.noteId)
            // console.log(someData)
            setData_note([...otherElement, someData])
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
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getAllKey, getAllArticles } from "../hooks/useDataQuery";
const GlobalContext = createContext()

export default function GlobalContextProvider({children}){
    
    const [data_note, setData_note] = useState([])
    const [data_articles, setArticles] = useState([])
    const [longSelection, setLongSelection] = useState(false),
    LongSel = {longSelection, setLongSelection}

    
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

    const getAllNote = async () => {
        const data = await getAllKey()
        setData_note(data)
    }

    const getNote = (id) => {
        const noteSelect = data_note.filter(el => el.noteId === id)
        return noteSelect[0]
    }

    const testePromise = (id) => {
        const value = new Promise((resolve, reject) => {
            const noteSelect = data_note.filter(el => el.noteId === id)
            resolve(noteSelect[0])

            reject(console.log('il y a une erreur'))
        })

        return value
    }


    const getAllPublication = async () => {
        const data = await getAllArticles()
        setArticles(data)
    }

    useEffect(() => {
        getAllNote()
        getAllPublication()
    }, [])

    return(
        <GlobalContext.Provider value={{data_note, data_articles, SaveData, LongSel, getNote, testePromise }}>
            {children}
        </GlobalContext.Provider>
    )
}

/**
 * @typedef {{ longSelection : boolean, setLongSelection : (value) => React.Dispatch<boolean>}} LongSelProps
 * @typedef {{name : string, userId : string, }} USER
 * @typedef {{note_content : string, createdAt : number, createdBy : USER, epingler : boolean, published : string | object, noteId : string, userId : string}} note_content
 * @returns {{ data_note : Array<any>, SaveData : (value) => React.Dispatch<[]>, LongSel : LongSelProps, getNote : (id : string) => note_content, testePromise : (id:string) => Promise<any> }}
 */
export const useGlobalContext = () => useContext(GlobalContext)
import { useState } from 'react';

/**
 * @typedef {{id : string, content : string, createdAt : number, published : boolean, createdBy : string, epingler : number  }} NoteProps
 * @typedef {{lastInsertRowId : number, changes : number, result}} getDataProps
 */





export const  setData = async (Data) => {
    const {content, epingler, id, published} = Data
    console.log(Data)
    try {
        const jsonValue = JSON.stringify(Data);
        const request = await fetch('https://nuvelserver.godigital.workers.dev/note/daniel_10000-20000-30000/doc/'+id+'/content', {
            method : 'PUT',
            body : jsonValue,
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const response =  await request.json()
    } catch (error) {
        console.log(error);
    }
    // teste
    return Data
}


export const getData = async (id) => {

    try {
        const jsonValue = await AsyncStorage.getItem(id);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch (e) {
        console.log(error);
      }
}


export const getAllKey = async () => {
    const request = await fetch('https://nuvelserver.godigital.workers.dev/note/daniel_10000-20000-30000')
    const response =  await request.json()
    
   return response
}
export const getAllArticles = async () => {
    const request = await fetch('https://nuvelserver.godigital.workers.dev/articles/daniel_10000-20000-30000/doc/')
    const response =  await request.json()
   return response
}
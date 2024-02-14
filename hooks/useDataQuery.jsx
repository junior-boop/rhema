import * as SQLite from 'expo-sqlite/next';
import { useState } from 'react';

/**
 * @typedef {{id : string, content : string, createdAt : number, published : boolean, createdBy : string, epingler : number  }} NoteProps
 * @typedef {{lastInsertRowId : number, changes : number, result}} getDataProps
 */



async function database(){
    
    const db = await SQLite.openDatabaseAsync('database_note')

    await db.execAsync(`
        DROP TABLE IF EXISTS Notes;
        CREATE TABLE IF NOT EXISTS Notes (
            id INTEGER PRIMARY KEY NOT NULL,
            content VARCHAR(3000) not NULL,
            createdAt INTEGER NOT NULL,
            published VARCHAR(20) NOT NULL,
            createdBy VARCHAR(255) NOT NULL,
            epingler INTEGER NOT NULL
        );
    `);

    return db
}

export const  setData = async (Data) => {
    const db = await database()
    const {content, createdAt, epingler, createdBy, id, published} = Data
    const result = await db.runAsync('INSERT INTO Notes (id, content, createdAt, published, createdBy, epingler) VALUES (?, ?, ?, ?, ?, ?)', id, content, createdAt, published, createdBy, epingler);

    return { lastInsertRowId : result.lastInsertRowId, changes : result.changes, result}
}


export const getData = async () => {
    const db = await database()
    const allRows = await db.getAllAsync('SELECT * FROM Notes');
    return allRows
}
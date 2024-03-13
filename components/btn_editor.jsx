import { TouchableOpacity, StyleSheet, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'
import { Link,  router } from 'expo-router'
import IdGenerator from '../hooks/id-generator'
import { useGlobalContext } from '../context/global_context'
export default function Btn_New_Note(){


    const { SaveData } = useGlobalContext()

    const handleClick = async () => {
        const id = IdGenerator(15, 5)
        const obj = {
            noteId : id + '_' + Date.now(),
            note_content : '',
            published : 'false',
            epingler : 0,
            createdAt : Date.now(),
            updatedAt : Date.now()
          }
         
         try {
            const jsonValue = JSON.stringify(obj);
            const request = await fetch('https://nuvelserver.godigital.workers.dev/note/daniel_10000-20000-30000/doc/'+ obj.noteId, {
                method : 'POST',
                body : jsonValue,
                headers : {
                    'Content-Type' : 'application/json'
                }
            })
            const response =  await request.json()
            SaveData(response[0])
            console.log(response[0])
        } catch (error) {
            // saving error
            console.log(error);
        }

        router.navigate({
            pathname : '/[id]', 
            params :  {
                id : obj.noteId, 
                userid : "daniel_10000-20000-30000", 
                note_content : '{"blocks":[{"type":"titre","data":{"text":"Votre titre"}},{"type":"paragraph","data":{"text":"Faites nous grandir dans la foi"}}]}'
              }})
    }

    return(
        <TouchableOpacity onPress={handleClick} style = {styles.btn_ajoute}>
            <AntDesign name="plus" size={32} color="white"  />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    btn_ajoute : {
        position : 'absolute',
        zIndex : 12,
        bottom : 20,
        right : 20,
        width : 56,
        aspectRatio : 1,
        borderRadius : 56,
        backgroundColor : '#3b82f6',
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 2
      }
})
import { useEffect, useState } from "react"
import { ScrollView, View } from "react-native"
import { Text } from "./Themed"
import { convert } from "@/constants/convert"

interface multipeSelection {
    items : Array<any>,
    value : Array<any>
    onChange : (value : any) => void
  }
  
export default function MultipleSelection({items, value, onChange} : multipeSelection) {
    const [initale, setInitiale] = useState([...value])
  
    const onChangeValue = (value : any) => {
      const liste = [...initale]
      if(value.state) {
        liste.push(value.value)
        setInitiale(liste)
      } 
  
      else {
        const filtre = liste.filter( el => el.code !== value.value.code)
        setInitiale(filtre)
      }
    }


    useEffect(() => {
      onChange(initale)
    }, [initale])
    return(
      <View style = {{paddingVertical : 32, alignItems : 'center'}}>
        <ScrollView 
        style = {{ height : convert(390),  width: "100%" }}
        contentContainerStyle = {{ alignItems : 'center', paddingVertical : convert(12)}}
        >
        <View style = {{ flexDirection : 'row', justifyContent : 'center', alignItems : 'center', alignContent : 'center', width :'85%', gap : 4, flexWrap : 'wrap'}}>
            {
              items.map((el, key) => {
                
                for(let i = 0; i < initale.length; i++){
                    const itemSelect = initale[i]
                    if(el.code === itemSelect.code) {
                        return <Domaine onPress={onChangeValue}  value = {el} key={key} isChecked = {true} />
                    }

                }
                return <Domaine onPress={onChangeValue}  value = {el} key={key} />

              } )
            }
        </View>
        </ScrollView>
      </View>
    )
  }
  
   type domaineProps = {
      value? : any,
      isChecked? : boolean,
      onPress? : (event : any) => void
   }
  function Domaine({ value, isChecked = false, onPress } : domaineProps) {
    const [state, setState] = useState(isChecked)
  
    const handlePress = () => {
      setState(!state)
  
      const object = {
        state : !state, 
        value
      }
  
      onPress !== undefined && onPress(object)
    }
  
    // useEffect(()=> {
    //   if(state) onChangeValue(value)
    //   else onChangeValue(undefined)
    // }, [state])
  
    return(<Text onPress={handlePress} fontWeight='500' style = {{ paddingHorizontal : convert(16), paddingVertical : 7, backgroundColor: state ? '#1e293b': '#e2e8f0', fontSize : convert(16), borderRadius : convert(50), color : state ? 'white' : 'black'  }}>{value.hash}</Text>)
  }
import { TextInput, TouchableOpacity, View } from "react-native";
import { Text } from "./Themed";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { convert } from "@/constants/convert";



export default function ReferenceBiblique({ onChange }: { onChange: (T: any) => void }) {
  const [ref, setRef] = useState('')
  const [table, settable] = useState([])
  const [counter, setCounter] = useState(0)

  const parsing = (value: any) => {
    const reference = value
    const checker = /(\w+)|(\d+)/ig
    const matcher = reference.match(checker)

    return matcher
  }

  const handleClick = async () => {
    const r = parsing(ref)
    const obj = {
      livre: r[0],
      chap: r[1],
      v1: r[2],
      v2: r[3] !== undefined ? r[3] : undefined
    }
    const request = await fetch(`https://bible-srwb.onrender.com/bible-ref?book=${obj.livre}&chap=${obj.chap}&v1=${obj.v1}&v2=${obj.v2}`)
    const response = await request.json()

    const object = {
      id: counter,
      data: response
    }
    settable(prev => [...prev, object])
    setCounter(counter + 1)
    setRef('')
  }

  const ReferenceComponent = ({ refs }: any) => {
    const { id, data } = refs
    const handleRemove = () => {
      const filter = table.filter((el: any) => el.id !== id)
      settable(filter)
    }
    return (
      <View style={{ paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#eff6ff', borderRadius: 2, flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Text fontWeight="500" style={{ marginBottom: -3, color: "#2563eb" }}>{data.reference}</Text>
        <TouchableOpacity onPress={handleRemove}>
          <MaterialIcons name="close" size={18} color="#2563eb" />
        </TouchableOpacity>
      </View>
    )
  }


  useEffect(() => {
    onChange(table)
  }, [table])

  return (
    <View>
      <View style={{ paddingHorizontal: convert(20), paddingTop: convert(20), paddingBottom: 10 }}>
        <Text fontWeight='700' style={{ textTransform: 'uppercase', color: '#777' }} >Reference Biblique*</Text>
      </View>
      {
        table.length > 0 && (<View style={{ paddingHorizontal: convert(14), flexDirection: "row", marginBottom: convert(5), gap: 5, flexWrap: "wrap" }}>
          {
            table.map((el, key) => <ReferenceComponent refs={el} key={key} />)
          }
        </View>)
      }
      <View style={{ paddingHorizontal: convert(14) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 2 }}>
          <TextInput
            placeholder='Exod 20 1 6'
            placeholderTextColor={'#94a3b8'}
            onChangeText={text => setRef(text)}
            value={ref}
            textAlignVertical='center'
            style={{ fontSize: convert(18), fontFamily: 'Poppins', justifyContent: 'center', borderRadius: convert(2), marginBottom: -4, flex: 1, paddingLeft: convert(8) }}
          />
          <TouchableOpacity onPress={handleClick} style={{ height: convert(40), width: convert(40), alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
import {  TouchableOpacity, View } from "react-native";
import { Text } from "./Themed";
import { w } from '@/constants/others'

export default function User_Publish_item({ titre, description}:{ titre : string, description : string}){
    const description_short = description.length > 70 ? `${description.substring(0, 69)}...` : description
    return(
        <TouchableOpacity style = {{ width : w - 100, aspectRatio : 1, borderColor : '#e2e8f0', backgroundColor : 'white', borderWidth : 1, padding : 14, borderRadius : 2, justifyContent : 'space-between'}}>
            <View>
                <View style = {{ marginBottom : 4}}>
                    <Text fontWeight="600" style = {{ fontSize : 18, lineHeight : 19}}>{titre}</Text>
                </View>
                <View>
                    <Text style = {{ color : '#64748b', lineHeight : 17}}>{description_short}</Text>
                </View>
            </View>
            <View style = {{ flexDirection : "row"}}>
                <View style = {{ width : '60%'}}>
                    <Text fontWeight="600" style = {{lineHeight : 16}}>Publié</Text>
                    <Text>Le 12 Mars </Text>
                </View>
                <View>
                    <Text  fontWeight="600" style = {{lineHeight : 16}}>Lecteurs</Text>
                    <Text>23</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

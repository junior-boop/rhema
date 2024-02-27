import { Text, View } from "react-native";


type Titre_PageProps = {
    titre : string
}
export default function Titre_Page({titre}:Titre_PageProps){
    return(
        <View style = {{ paddingHorizontal : 27, paddingVertical : 12}}>
            <View>
                <Text style = {{ textTransform : "uppercase", fontWeight : "800", fontSize : 12, color : '#475569' }}>{titre}</Text>
            </View>
        </View>
    )
}
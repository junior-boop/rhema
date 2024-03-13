import { convert } from "@/constants/convert";
import { Text, View } from "react-native";


type Titre_PageProps = {
    titre : string
}
export default function Titre_Page({titre}:Titre_PageProps){
    return(
        <View style = {{ paddingHorizontal : convert(27), paddingVertical : convert(12)}}>
            <View>
                <Text style = {{ textTransform : "uppercase", fontWeight : "800", fontSize : convert(12), color : '#475569' }}>{titre}</Text>
            </View>
        </View>
    )
}
import { Text, TouchableOpacity, View } from "react-native";

export default function User_Publish_item(){
    return(
        <TouchableOpacity style = {{ width : 180, aspectRatio : 1, borderColor : '#e2e8f0', borderWidth : 1, padding : 14, borderRadius : 8, justifyContent : 'space-between'}}>
            <View>
                <View>
                    <Text style = {{ fontSize : 18, fontWeight : '700'}}>Je teste le rendu de mon application</Text>
                </View>
                <View>
                    <Text style = {{ color : '#64748b'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolore quia ipsum eius!</Text>
                </View>
            </View>
            <View style = {{ flexDirection : "row"}}>
                <View style = {{ width : '60%'}}>
                    <Text style = {{fontWeight : "600"}}>Publié</Text>
                    <Text>Le 12 Mars </Text>
                </View>
                <View>
                    <Text style = {{fontWeight : "600"}}>Lecteurs</Text>
                    <Text>23</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
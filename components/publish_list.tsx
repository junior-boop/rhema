import { ScrollView, View } from "react-native";
import Titre_Page from "./titre_page";
import User_Publish_item from "./user_publish_item";

export default function Published_list({ data}){
    console.log(data)
    return(
        <View style = {{ marginBottom : 12}}>
            <Titre_Page titre="Publications" />
            <ScrollView horizontal showsHorizontalScrollIndicator = {false} contentContainerStyle = {{ paddingHorizontal : 12, gap : 10}}>
                <User_Publish_item />
                <User_Publish_item />
                <User_Publish_item />
            </ScrollView>
        </View>
    )
}
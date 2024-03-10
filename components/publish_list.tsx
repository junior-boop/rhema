import { ScrollView, View } from "react-native";
import Titre_Page from "./titre_page";
import User_Publish_item from "./user_publish_item";

export default function Published_list({data}){

    return(
        <View style = {{ marginBottom : 12}}>
            <Titre_Page titre="Publications" />
            <ScrollView horizontal showsHorizontalScrollIndicator = {false} contentContainerStyle = {{ paddingHorizontal : 12, gap : 10}}>
                {
                    data.reverse().map((el, key) => {
                        return <User_Publish_item key = {key} titre={el.titre} description={el.description}/>
                    })
                }
            </ScrollView>
        </View>
    )
}
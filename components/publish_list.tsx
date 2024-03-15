import { ScrollView, View } from "react-native";
import Titre_Page from "./titre_page";
import User_Publish_item from "./user_publish_item";

export default function Published_list({ data }: any) {

    return (
        <View style={{ marginBottom: 12 }}>
            <Titre_Page titre="Publications" />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, gap: 10 }} centerContent={true} snapToAlignment="center" pagingEnabled={true} >
                {
                    data.reverse().map((el: any, key: number) => {
                        return <User_Publish_item key={key} titre={el.titre} description={el.description} data={el} />
                    })
                }
            </ScrollView>
        </View>
    )
}
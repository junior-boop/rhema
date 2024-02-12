import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
         tabBarStyle : {
          backgroundColor : 'white',
          height : 62,
          justifyContent : 'center'
         },
         tabBarIconStyle : {
          borderWidth : 1,
          borderColor : 'black',
          width : 70,
          height : 50,
          justifyContent : 'center'
         },
         tabBarItemStyle : {
          backgroundColor : 'red',
          paddingHorizontal : 12 
         }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown : false
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown : false,
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}

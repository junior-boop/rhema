import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
         tabBarStyle : {
          backgroundColor : 'white',
          height : 58,
          justifyContent : 'center'
          
         },
         tabBarShowLabel : false
         
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown : false,
          tabBarIcon : ({color}) => <TabBarIcon name='home' color={color} />
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown : false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search1" color={color} />
        }}
      />
      <Tabs.Screen
        name="note"
        options={{
          headerShown : false,
          tabBarIcon: ({ color }) => <TabBarIcon name="edit" color={color} />,
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown : false,
          tabBarIcon: ({ color }) => <TabBarIcon name="setting" color={color} />,
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Link, Tabs } from 'expo-router';
import { RiEditBoxFill, RiEditBoxLine, RiHome6Fill, RiHome6Line, RiSearchFill, RiSearchLine, RiSettings3Fill, RiSettings3Line } from '@/components/icons';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={24}  style={{ marginBottom: -3 }} {...props}  />;
}

export default function TabLayout() {
  const size = 24
  const inactive = "#64748b"
  return (
    <Tabs
      screenOptions={{
         tabBarStyle : {
          backgroundColor : 'white',
          height : 58,
          justifyContent : 'center',
          borderTopColor : '#fff',
          elevation : 30
         },
         tabBarShowLabel : false,
         
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown : false,
          tabBarIcon : ({color, focused}) => {
            if(focused) return <RiHome6Fill width={size} height={size} color={"black"} />
            return <RiHome6Line width={size} height={size} color={inactive} />
          }
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          headerShown : false,
          tabBarIcon: ({ color, focused }) => {
            if(focused) return <RiSearchFill width={size} height={size} color={"black"} />
            return <RiSearchLine width={size} height={size} color={inactive} />
          }
        }}
      />
      <Tabs.Screen
        name="note"
        options={{
          headerShown : false,
          tabBarIcon: ({ color, focused }) => {
            if(focused) return <RiEditBoxFill width={size} height={size} color={"black"} />
            return <RiEditBoxLine width={size} height={size} color={inactive} />
          }
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          headerShown : false,
          tabBarIcon: ({ color, focused }) => {
            if(focused) return <RiSettings3Fill width={size} height={size} color={"black"} />
            return <RiSettings3Line width={size} height={size} color={inactive} />
          }
        }}
      />
    </Tabs>
  );
}

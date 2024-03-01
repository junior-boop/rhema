/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { useEffect } from 'react';

type fontFamily = {
  fontWeight? : '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900'
};

export type TextProps = fontFamily & DefaultText['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

function Montserrat(props : fontFamily){
  switch (props.fontWeight){
    case '100':
      return 'Poppins_Thin';
    
    case '200':
      return 'Poppins_ExtraLight';
    
    case '300':
      return 'Poppins_Light';
    
    case '400':
      return 'Poppins';
    
    case '500':
      return 'Poppins_Medium';
    
    case '600':
      return 'Poppins_Semibold';
    
    case '700':
      return 'Poppins_Bold';
    
    case '800':
      return 'Poppins_Extrabold';
    
    case '900':
      return 'Poppins_Black';
    default:
      return 'Poppins';
  } 
}

export function Text(props: TextProps) {
  const { style, fontWeight, ...otherProps } = props;
  useEffect(() => {

  })
  return <DefaultText {...props} style={[props.style, { fontFamily: Montserrat(props)  }]}/>;
}


import React from 'react'
import {Text} from 'react-native'
import {colors} from '../styles'
const style = {
  fontFamily: 'M-Plus-Rounded',
  color: colors.text
}
export default function Label(props){
  return (
    <Text style={{...style,...props.style}}>
      {props.children}
    </Text>
  )
}

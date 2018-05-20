import React from 'react'
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import {darkGray} from '../utils/colors'

export default function TextButton({children, onPress, style={}}){
  return (
    <TouchableOpacity
    onPress={onPress}>
    <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles= StyleSheet.create({
  reset:{
    textAlign: 'center',
    color: darkGray,
    borderRadius: 6,
    borderWidth: 1,
    paddingTop: 20,
    paddingBottom: 20,
    borderColor: darkGray,
    overflow: 'hidden'
  }
})

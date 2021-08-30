import React from 'react'
import { ColorPicker } from 'react-native-color-picker'
 
const Picker = () => (
  <ColorPicker
    onColorSelected={color => alert(`Color selected: ${color}`)}
    style={{flex: 1}}
  />
)

export default Picker
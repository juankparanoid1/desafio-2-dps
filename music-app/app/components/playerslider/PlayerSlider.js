import { View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'
import stylePlayerSlider from './Style'

const PlayerSlider = ({progress}) => {
  return (
    <View style={stylePlayerSlider.playerControlsSlider}>
    <Slider
        style={{ width: '90%', height: 40 }}
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        minimumTrackTintColor="#b8b4b2"
        maximumTrackTintColor="#5c5452"
    />
    {/* <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{progress.position}</Text>
        <Text style={styles.labelText}>
            {Math.max(0, progress.duration - progress.position)}
        </Text>
    </View> */}
</View>
  )
}

export default PlayerSlider


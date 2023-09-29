import { Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import styleSliderItem from './Style';

const randomColor = () => {
  const r = Math.floor(Math.random() * 156 + 100);
  const g = Math.floor(Math.random() * 156 + 100);
  const b = Math.floor(Math.random() * 156 + 100);
  const color = `rgb(${r},${g},${b})`;
  return color;
}

const SliderItem = React.memo(({ item, index }) => {
  const navigation = useNavigation();
  const [albumCoverColor, setAlbumCoverColor] = useState(randomColor());
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('MusicInfo', { title: item.name, bgColor: albumCoverColor })}>
      <View style={[styleSliderItem.sliderItem,]}>
        <View style={{ width: '100%', height: '75%', borderColor: albumCoverColor, backgroundColor: albumCoverColor, borderWidth: 1, }}>
        </View>
        <View style={styleSliderItem.sliderInfoContainer}>
          <Text style={styleSliderItem.sliderInfoTitle}>{item.name}</Text>
          {/* <Text style={styleSliderItem.sliderInfoTitle}>cantante</Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
});

export default SliderItem


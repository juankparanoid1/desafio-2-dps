import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SliderItem from '../slideritem/SliderItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styleSlider from './Style';

const Slider = ({genres,  index }) => {
    const musicSliderRef = useRef(null)
    const [sliderIndex, setSliderIndex] = useState(0);
    const [albumList, setAlbumList] = useState(genres.albums);
    const isAtEnd = sliderIndex === albumList.length - 2;

    useEffect(() => {
        musicSliderRef.current?.scrollToIndex({
            animated: true,
            index: sliderIndex,
        })
    }, [sliderIndex])

    const next = () => {
        if (sliderIndex <= albumList.length - 1) {
            setSliderIndex((prevIndex) => prevIndex + 1);
        }
    }

    const previous = () => {
        if (sliderIndex > 0) {
            setSliderIndex((prevIndex) => prevIndex - 1);
        }
    }

    return (
        <View style={styleSlider.musicContainer}>
            <TouchableOpacity onPress={() => previous()}>
                <View style={styleSlider.arrow}>
                    <Icon name='keyboard-arrow-left' size={30} color="#000"></Icon>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={styleSlider.sliderTitleContainer}>
                    <Text style={styleSlider.sliderTitle}>{genres.name}</Text>
                </View>
                <FlatList
                    id={index}
                    ref={musicSliderRef}
                    horizontal={true}
                    initialNumToRender={5}
                    style={styleSlider.sliderContainer}
                    showsHorizontalScrollIndicator={false}
                    scrollEnabled={false}
                    ItemSeparatorComponent={<View style={{ width: 15 }}></View>}
                    data={albumList}
                    renderItem={({ item, index, separators }) => (
                        <SliderItem item={item} index={index}></SliderItem>
                    )}
                    keyExtractor={(item, index) => 'key' + index}
                >
                </FlatList>
            </View>
            <TouchableOpacity onPress={() => next()} disabled={isAtEnd}>
                <View style={styleSlider.arrow}>
                    <Icon name='keyboard-arrow-right' size={30} color="#000"></Icon>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Slider


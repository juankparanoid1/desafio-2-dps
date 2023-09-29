import { Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styleMusicItem from './Style';


const MusicItem = React.memo(({ item, index, color }) => {
    const navigation = useNavigation();
    const [likeIconColor, setLikeIconColor] = useState('#000');
    const [playIcon, setPlayIcon] = useState('play-outline');
    const [stopIcon, setStopIcon] = useState('stop-outline');

    useFocusEffect(
        useCallback(() => {
            // Do something when the screen is focused
            setLikeIconColor('#000');
            setPlayIcon('play-outline');
            setStopIcon('stop-outline')
            return () => {
                // Do something when the screen is unfocused
                // Useful for cleanup functions
            };
        }, [])
    );

    const colorToLikeBtn = () => {
        const colorBtn = likeIconColor === '#fb0006' ? '#000' : '#fb0006'
        setLikeIconColor(colorBtn)
    }

    const playIconBtn = () => {
        const icon = playIcon === 'play-outline' ? 'play' : 'play-outline';
        setPlayIcon(icon);
        navigation.navigate('PlayMusic', {music: item, color: color});
    }

    const stopIconBtn = () => {
        const icon = stopIcon === 'stop-outline' ? 'stop' : 'stop-outline';
        setStopIcon(icon);
    }
    return (
        <View style={styleMusicItem.musicItemContainer}>
            <View style={styleMusicItem.musicItemInfo}>
                <Text style={styleMusicItem.musicItemTitle}>{item.name?.trim()?.split('-')[0]} </Text>
                <Text style={styleMusicItem.musicItemSinger}>{item.name?.trim()?.split('-')[1]}</Text>
            </View>
            <View style={styleMusicItem.musicItemActions}>
                <TouchableOpacity onPress={() => playIconBtn()}>
                    <Icon name={playIcon} size={40} color="#000"></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => stopIconBtn()}>
                    <Icon name={stopIcon} size={40} color='#000'></Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => colorToLikeBtn()}>
                    <Icon name={likeIconColor === '#fb0006' ? 'heart-sharp' : 'heart-outline'} size={40} color={likeIconColor}></Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
});

export default MusicItem


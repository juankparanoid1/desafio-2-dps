import React from 'react'
import MusicPlayer from '../components/musicplayer/MusicPlayer';
import { useNavigation } from '@react-navigation/native';

const PlayMusic = ({route}) => {
    return (
        <MusicPlayer item={route.params.music} color={route.params.color}></MusicPlayer>
    )
}

export default PlayMusic


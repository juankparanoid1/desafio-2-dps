import { FlatList, View } from 'react-native'
import React from 'react'
import MusicItem from '../musicItem/MusicItem';
import styleMusicList from './Style';

const MusicList = ({ musicList, color }) => {
    return (
        <View style={styleMusicList.musicContainer}>
            <FlatList
                style={{ flex: 1 }}
                showsVerticalScrollIndicator={false}
                initialNumToRender={5}
                data={musicList}
                ItemSeparatorComponent={<View style={{ borderWidth: 1, borderColor: '#000000' }}></View>}
                renderItem={({ item, index, separators }) => (
                   <MusicItem item={item} index={index} color={color}></MusicItem>
                )}
            >
            </FlatList>
        </View>
    )
}

export default MusicList


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styleAlbumCover from './Style'

const AlbumCover = ({color}) => {
    return (
        <View style={styleAlbumCover.imageContainer}>
            <View style={[styleAlbumCover.titleImage, {backgroundColor: color}]}>
            </View>
        </View>
    )
}

export default AlbumCover


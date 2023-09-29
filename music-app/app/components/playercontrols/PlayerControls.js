import { TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import stylePlayerControls from './Style';

const PlayerControls = ({ previous, pause, stop, next,playIcon }) => {
    return (
        <View style={stylePlayerControls.controls}>
            <TouchableOpacity onPress={() => previous()}>
                <IconMaterial name={'skip-previous'} size={40} color="#696969"></IconMaterial>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pause()}>
                <Icon name={playIcon} size={40} color="#696969"></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => stop()}>
                <Icon name={'stop-sharp'} size={40} color='#696969'></Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => next()}>
                <IconMaterial name={'skip-next'} size={40} color='#696969'></IconMaterial>
            </TouchableOpacity>
        </View>
    )
}

export default PlayerControls


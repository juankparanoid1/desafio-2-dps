import { Text, View } from 'react-native'
import React from 'react'
import styleHeader from './Style'

const Header = () => {
    return (
        <View style={styleHeader.titleContainer}>
            <Text style={styleHeader.titleHeader}>Music UDB</Text>
        </View>
    )
}

export default Header


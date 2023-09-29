import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/header/Header';
import Slider from '../components/slider/Slider';
import musicListJson from '../data/music';

const Home = () => {
    const [genresList, setGenresList] = useState(musicListJson);
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Header></Header>
            {
                genresList.map((genres, index) => (
                    <Slider genres={genres} key={index} />
                ))
            }

        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({})
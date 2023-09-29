import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import MusicList from '../components/musiclist/MusicList';
import AlbumCover from '../components/albumcover/AlbumCover';
import musicListJson from '../data/music';

const MusicInfo = ({route}) => {
  const [musicList, setMusicList] = useState([]);

  const loadMusic = () => {
    musicListJson.forEach(genres => {
      genres.albums.forEach(albums => {
        if(albums.name === route.params.title){
          setMusicList(albums.songs);
        }
      });
    });
    
  }

  useEffect(() => {
    loadMusic();
    return () => {
    }
  }, [])
  
  return (
    <View style={styles.container}>
      <AlbumCover color={route.params.bgColor}></AlbumCover>
      <MusicList musicList={musicList} color={route.params.bgColor}></MusicList>
    </View>
  )
}

export default MusicInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#ce5127',
  },

})
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AlbumCover from '../albumcover/AlbumCover'
import TrackPlayer, { Event, State, usePlaybackState, useProgress, useTrackPlayerEvents } from 'react-native-track-player'
import { initializeTrackPlayer, playTrack, stopPlayback } from '../../services/TrackPlayerManager';
import PlayerControls from '../playercontrols/PlayerControls';
import PlayerSlider from '../playerslider/PlayerSlider';
import styleMusicPlayer from './Style';

const MusicPlayer = ({item, color}) => {
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackTitle, setTrackTitle] = useState();
    const [trackArtist, setTrackArtist] = useState();
    const [trackArtwork, setTrackArtwork] = useState();
    const [playIcon, setPlayIcon] = useState('play-sharp');
    const progress = useProgress();
    const playBackState = usePlaybackState();
    const [isPlayerInitialized, setPlayerInitialized] = useState(false);

    const track = {
        url: require('music-app/app/src/music/01CREATIONReCREATION(Duet).mp3'), // Load media from appbundle
        title: 'CREATION ReCREATION (Duet)',
        artist: 'Bibleart',
        album: 'CREATION ReCREATION',
        genre: 'Anime',
        date: '2015-05-20T07:00:00+00:00', // RFC 3339
        artwork: '', // Load artwork from the network
        duration: 223 // Duration in seconds
    };

    const next = () => {
    }

    const pause = async () => {
        const icon = playIcon === 'play-sharp' ? 'pause-sharp' : 'play-sharp';
        setPlayIcon(icon);
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack != null) {
            if ((playBackState == State.Paused) | (playBackState == State.Ready)) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        }
    }

    const stop = async () => {
        try {
            const currentTrack = await TrackPlayer.getCurrentTrack();
            if (currentTrack !== null) {
                if (playBackState == State.Paused | playBackState == State.Playing) {
                    await TrackPlayer.reset();
                    await TrackPlayer.add(track);
                    await gettrackdata();
                    await TrackPlayer.play();
                }
            }
        } catch (error) {
            console.log(error);
        }

    }

    const previous = () => {

    }

    const gettrackdata = async () => {
        let trackIndex = await TrackPlayer.getCurrentTrack();
        if (trackIndex !== null) {
            let trackObject = await TrackPlayer.getTrack(trackIndex);
            if (trackObject !== null) {
                setTrackIndex(trackIndex);
                setTrackTitle(trackObject.title);
                setTrackArtist(trackObject.artist);
                setTrackArtwork(trackObject.artwork);
            }
        }
    };

    const setupPlayer = async () => {
        try {
            await gettrackdata();
            await playTrack(track);
        } catch (error) {
            console.log(error);
        }
    }

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            if (track) {
                const { title, artwork, artist } = track;
                setTrackIndex(event.nextTrack);
                setTrackTitle(title);
                setTrackArtist(artist);
                setTrackArtwork(artwork);
            }
        }
    });

    useEffect(() => {
        initializeTrackPlayer();
        setupPlayer();
        return async () => {
            stopPlayback();
        }
    }, []);

    return (
        <View style={styleMusicPlayer.container}>
            <AlbumCover color={color}></AlbumCover>
            <View style={styleMusicPlayer.playerContainer}>
                <View style={styleMusicPlayer.playerInfo}>
                    <Text style={styleMusicPlayer.playerTitle}>{item.name?.trim()?.split('-')[0]}</Text>
                    <Text style={styleMusicPlayer.playerSinger}>{item.name?.trim()?.split('-')[1]}</Text>
                </View>
                <View style={styleMusicPlayer.playerControls}>
                    <PlayerControls next={next} pause={pause} previous={previous} stop={stop} playIcon={playIcon}></PlayerControls>
                    <PlayerSlider progress={progress}></PlayerSlider>
                </View>
            </View>
        </View>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({})
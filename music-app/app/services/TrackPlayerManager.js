import TrackPlayer from 'react-native-track-player';

let isInitialized = false;

export async function initializeTrackPlayer() {
    if (!isInitialized) {
        await TrackPlayer.setupPlayer();
        isInitialized = true;
    }
}

export async function playTrack(track) {
    await initializeTrackPlayer();
    await TrackPlayer.add(track);
    await TrackPlayer.play();
}

export async function stopPlayback() {
    await TrackPlayer.reset();
}
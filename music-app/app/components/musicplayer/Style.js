import { StyleSheet } from "react-native";

const styleMusicPlayer = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ce5127',
    },
    playerContainer: {
        flex: 1.5,
        // backgroundColor: '#ce5127',
    },
    playerInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    playerTitle: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    playerSinger: {
        fontSize: 25,
    },
    playerControls: {
        flex: 3,
    },
})

export default styleMusicPlayer;
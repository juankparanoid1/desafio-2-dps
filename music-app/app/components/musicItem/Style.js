import { StyleSheet } from "react-native";

const styleMusicItem = StyleSheet.create({
    musicItemContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    musicItemInfo: {
        flex: 2,
    },
    musicItemTitle: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    musicItemSinger: {
        fontSize: 15,
    },
    musicItemActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#2035c8'
    }
})

export default styleMusicItem;
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { deleteContact, getContactList } from '../service/ContactService';

const Home = ({ route }) => {
    const navigation = useNavigation();
    const [contacts, setContacts] = useState([]);
    const [reload, setReload] = useState(false);
    const user = route.params;


    useEffect(() => {
        const contactList = async () => {
            const data = await getContactList(user.userId);
            setContacts(data);
        }
        contactList().catch(console.error);
        return  () => {
            setReload(false);
        } 
    }, [user, reload]);

    const deleteContactBtn = async(contactId) =>  {
        await deleteContact(contactId)
        setReload(true);
    }
    
    return (
        <>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Contactos</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={<View style={{ borderWidth: 2, borderColor: '#c4d1ed' }}></View>}
                    data={contacts}
                    renderItem={({ item, index, separators }) => (
                        <View style={styles.contactsItem}>
                            <View style={styles.contactsInfo}>
                                <Text style={styles.contactsInfoLabel}>{item.nombre} {item.apellido}</Text>
                                <Text style={styles.contactsInfoCell}>{item.telefono}</Text>
                            </View>
                            <View style={styles.contactsBtn}>
                                <TouchableOpacity style={styles.contactsBtnDelete} onPress={() => deleteContactBtn(item.id)}>
                                    <Text style={styles.contactsDeleteLabel}>Eliminar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    keyExtractor={(item, index) => 'key' + index}
                >
                </FlatList>
                <TouchableOpacity style={styles.floatingBtn} onPress={() => navigation.navigate('AddContact', { userId: user.userId })}>
                    <Text style={styles.iconBtn}>+</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 20,
    },
    header: {
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d40dd',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: '300',
        paddingVertical: 30,
        color: '#efefef'
    },
    contactsItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    contactsInfo: {
        flex: 2,
        flexDirection: 'column',
        // backgroundColor: '#b6c4c3'
    },
    contactsInfoLabel: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    contactsInfoCell: {
        fontSize: 20,
        paddingTop: 5,
    },
    contactsBtn: {
        flex: 1,
    },
    contactsBtnDelete: {
        backgroundColor: '#e9000e',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    contactsDeleteLabel: {
        fontSize: 20,
        color: '#fffeff'
    },
    floatingBtn: {
        borderWidth: 1,
        borderColor: '#1623d5',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        position: 'absolute',
        bottom: 30,
        right: 10,
        height: 70,
        backgroundColor: '#1623d5',
        borderRadius: 100,
    },
    iconBtn: {
        fontSize: 50,
        color: 'white'
    }
})
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { saveNewContact } from '../service/ContactService';
import uuid from 'react-native-uuid';

const AddContact = ({ route }) => {
    const navigation = useNavigation();
    const [contactForm, setContactForm] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
    });

    const { userId } = route.params;

    const addContact = async () => {
        if (!contactForm.nombre || !contactForm.apellido || !contactForm.telefono) {
            Alert.alert('Los campos son requeridos');
            return;
        }
        const contact = contactForm;
        contact.id = uuid.v4();
        contact.userId = userId;
        await saveNewContact(contact);
        navigation.navigate('Home', { userId: userId });
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1, padding: 15 }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Agregar Contacto</Text>
                </View>
                <View style={styles.controlsContainer}>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese nombre' placeholderTextColor={'#848081'}
                            onChange={(e) => setContactForm({ ...contactForm, nombre: e.nativeEvent.text })}></TextInput>
                    </View>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese apellido' placeholderTextColor={'#848081'}
                            onChange={(e) => setContactForm({ ...contactForm, apellido: e.nativeEvent.text })}></TextInput>
                    </View>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese numero de telefono' placeholderTextColor={'#848081'}
                            onChange={(e) => setContactForm({ ...contactForm, telefono: e.nativeEvent.text })}
                            keyboardType='phone-pad'></TextInput>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => addContact()}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnLabel}>Agregar Contacto</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default AddContact

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    header: {
        flexGrow: 0.5,
        paddingTop: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 40,
        fontWeight: '400'
    },
    controlsContainer: {
        // flex: 1,
        // backgroundColor: '#dbdf3b',
    },
    controlsInputContainer: {
        paddingVertical: 25,
        borderRadius: 20,
        backgroundColor: '#dbdbdb',
        marginBottom: 25,
    },
    controlsInput: {
        fontSize: 15,
        paddingHorizontal: 15,
    },
    btnContainer: {
        // flex: 1.5,
    },
    btnView: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3157bc',
        borderRadius: 20,
    },
    btnLabel: {
        color: '#ffffff',
        fontSize: 25,
    },
    registerNoAccountLabel: {
        fontSize: 18,
        fontWeight: '500',
    },
    registerLabel: {
        fontSize: 18,
        color: '#4467e4'
    }
})
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { register } from '../service/AuthService';
import uuid from 'react-native-uuid';

const Register = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        setRegisterForm({ ...registerForm, terms: !isEnabled })
    };
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });

    const registerUser = async () => {
        if (!registerForm.username || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
            Alert.alert('Los campos son requeridos');
            return;
        }
        if (registerForm.password !== registerForm.confirmPassword) {
            Alert.alert('Las contraseñas no son iguales');
            return;
        }
        if (!registerForm.terms) {
            Alert.alert('Acepte los terminos y condiciones');
            return;
        }
        const user = registerForm;
        user.id = uuid.v4();
        await register(registerForm);
        navigation.navigate('Home', { userId: user.id });
    }

    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1, padding: 15 }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Registrarse</Text>
                </View>
                <View style={styles.controlsContainer}>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese nombre de usuario' placeholderTextColor={'#848081'}
                            onChange={(e) => setRegisterForm({ ...registerForm, username: e.nativeEvent.text })}
                            autoCapitalize='none'></TextInput>
                    </View>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese email' placeholderTextColor={'#848081'}
                            onChange={(e) => setRegisterForm({ ...registerForm, email: e.nativeEvent.text })}
                            keyboardType='email-address'
                            textContentType={'emailAddress'}
                            autoCapitalize='none'></TextInput>
                    </View>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese password' placeholderTextColor={'#848081'}
                            onChange={(e) => setRegisterForm({ ...registerForm, password: e.nativeEvent.text })}
                            secureTextEntry={true}></TextInput>
                    </View>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Repita el password' placeholderTextColor={'#848081'}
                            onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.nativeEvent.text })}
                            secureTextEntry={true}></TextInput>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <View style={styles.termsConditionContainer}>
                        <Switch
                            trackColor={{ false: '#ffffff', true: '#d3d3d3' }}
                            thumbColor={isEnabled ? '#2540ae' : '#d3d3d3'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                        <Text style={styles.registerNoAccountLabel}>Acepto los terminos y condiciones</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        registerUser();
                    }}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnLabel}>Registrarse</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Register

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
    termsConditionContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#00e4a7',
        flexDirection: 'row',
        paddingBottom: 20,
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
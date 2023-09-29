import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { login } from '../service/AuthService';

const Login = () => {
    const navigation = useNavigation();
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });
    const loginUser = async() => {
        const user = await login(loginForm);
        if(!user){
            Alert.alert('Pueda que el usuario no exista o las credenciales son incorrectas');
            return;
        }
        navigation.navigate('Home', {userId: user.id});
    }
    return (
        <KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <View style={{ flex: 1, padding: 15 }}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Login</Text>
                </View>
                <View style={styles.controlsContainer}>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese email o nombre de usuario' placeholderTextColor={'#848081'}
                        onChange={(e) => setLoginForm({ ...loginForm, username: e.nativeEvent.text })}
                        autoCapitalize='none'></TextInput>
                    </View>
                    <View style={styles.controlsInputContainer}>
                        <TextInput style={styles.controlsInput} placeholder='Ingrese password' placeholderTextColor={'#848081'}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.nativeEvent.text })}
                        secureTextEntry={true}></TextInput>
                    </View>
                </View>
                <View style={styles.btnContainer}>
                    <TouchableOpacity onPress={() => loginUser()}>
                        <View style={styles.btnView}>
                            <Text style={styles.btnLabel}>Login</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.registerContainer}>
                        <Text style={styles.registerNoAccountLabel}>No tienes cuenta?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerLabel}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </KeyboardAvoidingView>
    )
}

export default Login

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
    registerContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
        // backgroundColor: '#00e4a7',
        flexDirection: 'row',
        paddingTop: 20,
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
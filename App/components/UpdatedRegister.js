import React, { useState } from 'react';
import { Alert, ActivityIndicator, View, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import firebase from '../firebase';

export default function App({ navigation }) {

    const [displayName, setdisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setpasswordConfirm] = useState('');


    /*     registerUser = () => {
            if(this.state.email === '' && this.state.password === '' && this.state.passwordConfirm === '') {
                Alert.alert('Enter details to register!')
            } else {
                if (this.state.password !== this.state.passwordConfirm) {
                    Alert.alert('Passwords do not match!')
                } else {
                    this.setState({
                        isLoading: true,
                    })
                    firebase
                    .auth()
                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                    .then((res) => {
                        res.user.updateProfile({
                            displayName: this.state.displayName
                        })
                        console.log('User registered successfully!')
                        this.setState({
                            isLoading: false,
                            displayName: '',
                            email: '',
                            password: ''
                        })
                        this.props.navigation.navigate('Login')
                    })
                    .catch(error => this.setState ({ errorMessage: error.message}))
                }
            } */

    const register = async () => {
        //setShowLoading(true);
        if (email === '' && password === '') { Alert.alert('Enter details to register!') }
        if (password !== passwordConfirm) { Alert.alert('Passwords do not match!') }
        else {
            try {
                const doRegister = await firebase.auth().createUserWithEmailAndPassword(email, password);
                //setShowLoading(false);
                if (doRegister.user) {
                    try {
                        firebase.auth().currentUser.sendEmailVerification();
                    } catch (e) {
                        Alert.alert(e.message);
                    }

                    navigation.navigate('Chat');
                }
            } catch (e) {
                //setShowLoading(false);
                Alert.alert(
                    e.message
                );
            }

        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Enter your name:
            </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Name"
                    value={displayName}
                    onChangeText={(displayName) => setdisplayName(displayName)}
                />
                <Text style={styles.title}>
                    Enter your UConn email address:
            </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Email"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(email) => setEmail(email)}
                />
                <Text style={styles.title}>
                    Choose a Password:
            </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Password"
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(password) => setPassword(password)}
                    secureTextEntry={true}
                />
                <Text style={styles.title}>
                    Re-type Password:
            </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Confirm Password"
                    autoCapitalize="none"
                    value={passwordConfirm}
                    onChangeText={(passwordConfirm) => setpasswordConfirm(passwordConfirm)}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={() => register()}
                    style={styles.submitButton}
                >
                    <Text style={styles.submitButtonText}>
                        Submit
                </Text>
                </TouchableOpacity>
                <Text style={styles.loginText}
                    onPress={() => navigation.navigate('Login')}>
                    Already Registered? Click here to login
            </Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const offset = 15;
const styles = StyleSheet.create({
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: 20,
    },
    submitButton: {
        margin: offset,
        backgroundColor: '#000080',
    },
    submitButtonText: {
        margin: offset,
        fontSize: 20,
        color: 'white'
    },
    input: {
        margin: offset,
        padding: offset,
        fontSize: offset,
        borderColor: '#111111',
        borderWidth: 1,
    },
    loginText: {
        color: '#3740FE',
        marginTop: 10,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
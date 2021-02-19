import React, { useState } from 'react';
import { Alert, ActivityIndicator, View, StyleSheet, Text, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
                <Image style={styles.image} source={require("../assets/UStudy.png")}/>
                <Text style={styles.joinUs}>Join UStudy</Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Name:"
                        placeholderTextColor="#003f5c"
                        value={displayName}
                        onChangeText={(displayName) => setdisplayName(displayName)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Email:"
                        autoCapitalize="none"
                        placeholderTextColor="#003f5c"
                        value={email}
                        onChangeText={(email) => setEmail(email)}
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Password:"
                        placeholderTextColor="#003f5c"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={(password) => setPassword(password)}

                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.TextInput}
                        placeholder="Confirm Password:"
                        placeholderTextColor="#003f5c"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={passwordConfirm}
                        onChangeText={(passwordConfirm) => setpasswordConfirm(passwordConfirm)}
                    />
                </View>

                <TouchableOpacity style={styles.signUpBtn} onPress={() => register()}>
                    <Text style={styles.loginText} >SIGN UP</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={styles.login_button}
                        onPress={() => navigation.navigate('Login')}>
                        Already have an account? Log In</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    image: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 40,
    },

    joinUs: {
        position: 'absolute',
        top: 100,
    },

    inputView: {
        backgroundColor: "#C2E0F9",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    login_button: {
        height: 30,
        marginBottom: 30,
    },

    signUpBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#2174C3",
    },

});
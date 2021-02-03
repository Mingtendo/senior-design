import React from 'react';
import { 
    Alert,
    ActivityIndicator,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import firebase from '../firebase';

class Register extends React.Component {

    constructor(){
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            passwordConfirm: '',
            isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    registerUser = () => {
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
        }
    }

    render() {
        if(this.state.isLoading){
            return(
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E"/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    Enter your name:
                </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Name"
                    value={this.state.displayName}
                    onChangeText={(val) => this.updateInputVal(val, 'displayName')}
                />
                <Text style={styles.title}>
                    Enter your UConn email address:
                </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Email"
                    autoCapitalize = "none"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <Text style={styles.title}>
                    Choose a Password:
                </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Password"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    secureTextEntry={true}
                />
                <Text style={styles.title}>
                    Re-type Password:
                </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Confirm Password"
                    autoCapitalize = "none"
                    value={this.state.passwordConfirm}
                    onChangeText={(val) => this.updateInputVal(val, 'passwordConfirm')}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={() => this.registerUser()}
                    style={styles.submitButton}
                    >
                    <Text style={styles.submitButtonText}>
                        Submit
                    </Text>
                </TouchableOpacity>
                <Text style={styles.loginText}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    Already Registered? Click here to login
                </Text>
            </View>
        )
    }
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

export default Register;
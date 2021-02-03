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

class Login extends React.Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            isLoading: false
        }
    }

    updateInputVal = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    userLogin = () => {
        if(this.state.email === '' && this.state.password === '') {
            Alert.alert('Enter details to login!')
        } else {
            this.setState({
                isLoading: true,
            })
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((res) => {
                console.log(res)
                console.log('User login successful!')
                this.setState({
                    isLoading: false,
                    email: '',
                    password: ''
                })
                this.props.navigation.navigate('Chat')
            })
            .catch(error => this.setState ({ errorMessage: error.message}))
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
                    Email:
                </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Email"
                    autoCapitalize = "none"
                    value={this.state.email}
                    onChangeText={(val) => this.updateInputVal(val, 'email')}
                />
                <Text style={styles.title}>
                    Password:
                </Text>
                <TextInput
                    style={styles.input}
                    placeHolder="Password"
                    autoCapitalize = "none"
                    value={this.state.password}
                    onChangeText={(val) => this.updateInputVal(val, 'password')}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={this.userLogin()}
                    style={styles.loginButton}
                    >
                    <Text style={styles.loginButtonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={styles.registerText}
                    onPress={() => this.props.navigation.navigate('Register')}>
                    Don't have an account? Click here to sign up
                </Text>
            </View>
        );
    }
}

const offset = 15;
const styles = StyleSheet.create({
    title: {
        marginTop: offset,
        marginLeft: offset,
        fontSize: 20,
    },
    loginButton: {
        margin: offset,
        backgroundColor: '#000080',
    },
    loginButtonText: {
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
    registerText: {
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

export default Login;

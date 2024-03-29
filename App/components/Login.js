import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Alert, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {Auth} from '../contexts/AuthContext';

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(Auth);

  const loginNavigation = (email, password) => {
    login(email, password).catch(err => { 
        alert(err);
    })
}

/*   const login = async () => {
    //setShowLoading(true);
    try {
      const doLogin = await firebase.auth().signInWithEmailAndPassword(email, password);
      //setShowLoading(false);
      if (doLogin.user) {
        navigation.navigate('Menu');
      }
    } catch (e) {
      //setShowLoading(false);
      Alert.alert(
        e.message
      );
    }
  }; */


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
       <Image style={styles.image} source = {require("../assets/UStudy.png")}/>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email:"
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
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
          <Text style={styles.forgot_button}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={() => loginNavigation(email, password)}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.forgot_button}>Need an account? Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>Terms of Use • Help • Privacy Policy</Text>

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
    width: 200,
    height: 200,
    marginBottom: 40
  },

  inputView: {
    backgroundColor: "#C2E0F9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: "#2174C3",
  },

  terms: {
    position: 'absolute',
    bottom: 15,
  },

});
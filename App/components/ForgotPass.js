import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function App({ navigation }) {
  const [email, setEmail] = useState('');
 
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
       <Image style={styles.image} source = {require("../assets/UStudy.png")}/>

       <Text style={styles.text}> Having Trouble Logging In? </Text>

       <Text style={styles.msg}> 
       {'Enter your email and we\'ll send \n you a link to get back \n into your account.'}
       </Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email:"
            placeholderTextColor="#003f5c"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <TouchableOpacity style={styles.linkBtn}>
          <Text style={styles.loginText}>Send Login Link</Text>
        </TouchableOpacity>
        
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: 100,
    height: 100,
    position: 'absolute',
    top: 40,
    },

  text: {
    position: 'absolute',
    textAlign: 'center',
    top: 160,
  },

  msg: {
    position: 'absolute',
    textAlign: 'center',
    fontStyle: 'italic',
    color: 'grey',
    top: 200,
  },

  inputView: {
    backgroundColor: "#C2E0F9",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 10,
    marginTop: 20,
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  linkBtn: {
    width: "70%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2174C3",
  },

  loginText: {
    color: 'white',
  },

  orback:{
    position: 'absolute',
    textAlign: 'center',
    top: 400,
  },

  back:{
    position: 'absolute',
    textAlign: 'center',
    top: 440,
  },
});
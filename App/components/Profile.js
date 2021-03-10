import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../firebase';

import {Auth} from './AuthContext';

export default function App({ navigation }) {

    const { logout } = useContext(Auth);

    return (
        <View style={styles.container}>
            <Text>Profile page will be listed here</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={() => logout()}>
                <Text style={styles.loginText}>LOGOUT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#2174C3",
    }
});
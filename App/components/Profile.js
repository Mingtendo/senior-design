import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../firebase';

export default function App({ navigation }) {
    return(
        <View style={styles.container}>
            <Text>Profile page will be listed here</Text>
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

});
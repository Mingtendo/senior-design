import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import firebase from '../firebase';

export default function ChatList({ navigation }) {

    const [chats, setChats] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase.firestore()
            .collection('CHATS')
            .onSnapshot(querySnapshot => {
                const chats = querySnapshot.docs.map(documentSnapshot => {
                    return {
                        _id: documentSnapshot.id,
                        // give defaults
                        name: '',

                        latestMessage: {
                            text: ''
                        },
                        ...documentSnapshot.data()
                    };
                });

                setChats(chats);
            });

        /**
         * unsubscribe listener
         */
        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
          <FlatList
            data={chats}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate('Chat', { chat: item })}>
                  <Text style={styles.chatTitle}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    chat: {
        backgroundColor: "#C2E0F9",
        alignItems:'center',
        width: 'auto',
        borderRadius: 30,
        height: 45,
        margin: 10,
    },

    chatTitle: {
        color: 'white',
        flex: 1,
        fontSize: 20,
        padding: 10,
    },
});
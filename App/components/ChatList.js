import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firebase from '../firebase';
import {Auth} from '../contexts/AuthContext';
import {Profile} from '../contexts/ProfileContext';

export default function ChatList({ navigation }) {
    const [chats, setChats] = useState([]);
    const { user } = useContext(Auth);
    const currentUser = user.toJSON();
    const {courses} = useContext(Profile);

    useFocusEffect(() => {
        if(courses.length > 0) {
            const course_names = courses.map(course => course.name);
            const chatListener = firebase.firestore()
                .collection('CHATS')
                .where('name', 'in', course_names)
                .onSnapshot(query => {
                    const chats = query.docs.map(documentSnapshot => {
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
            return () => chatListener();
        }
    });

    return (
        <View style={styles.container}>
          <FlatList
            data={chats}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
            <View style={styles.list}>
              <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate('Chat', { chat: item })}>
                  <Text style={styles.chatTitle}>{item.name}</Text>
              </TouchableOpacity>
            </View>
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

    list: {
        
    },

    chat: {
        backgroundColor: "#2174C3",
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
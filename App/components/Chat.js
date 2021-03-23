import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import { IconButton } from 'react-native-paper';
import firebase from '../firebase';

import { Auth } from './AuthContext';

export default function App({ route }) {

    const { user } = useContext(Auth);
    const { chat } = route.params;
    const [messages, setMessages] = useState([]);
    const currentUser = user.toJSON();

    async function handleSend(messages) {
        const text = messages[0].text;

        firebase.firestore()
            .collection('CHATS')
            .doc(chat._id)
            .collection('MESSAGES')
            .add({
                text,
                createdAt: new Date().getTime(),
                user: {
                    _id: currentUser.uid,
                    email: currentUser.email
                }
            });

        await firebase.firestore()
            .collection('CHATS')
            .doc(chat._id)
            .set({
                latestMessage: {
                    text,
                    createdAt: new Date().getTime()
                }
            },
                { merge: true }
            );

    }


    useEffect(() => {
        const messagesListener = firebase.firestore()
            .collection('CHATS')
            .doc(chat._id)
            .collection('MESSAGES')
            .orderBy('createdAt', 'desc')
            .onSnapshot(query => {
                const messages = query.docs.map(doc => {
                    const collectionData = doc.data();

                    const data = {
                        _id: doc.id,
                        text: '',
                        createdAt: new Date().getTime(),
                        ...collectionData
                    };

                    return data;
                });

                setMessages(messages);
            });
        return () => messagesListener();
    }, []);

    function renderBubble(props){
        return(
            <Bubble
                {...props}
                wrapperStyle={{
                    right:{
                        backgroundColor: '00BFFF'
                    }
                }}
                textStyle={{
                    right:{
                        color: '#FFF'
                    }
                }}
            />
        );
    }

    function renderSend(props){
        return(
            <Send {...props}>
                <View style={StyleSheet.sendingContainer}>
                    <IconButton icon='send-circle' size={28} color='#00BFFF'/>
                </View>
            </Send>
        );
    }

    return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            user={{ _id: currentUser.uid }}
            // renderBubble={renderBubble}
            placeholder='Type your message here...'
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
        />
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
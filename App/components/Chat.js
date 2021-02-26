import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import * as firebase from 'firebase';


/* class Chat extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: (navigation.state.params || {}).email || 'Chat!',
    });

    state = {
        messages: [],
    };

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
            />
        );
    }
}

export default Chat; */

export default function App(props) {

    //const { user } = props.route.params.doLogin.user;
    const [messages, setMessages] = useState([]);
    //const currentUser = user.toJSON();

    async function handleSend(messages) {
        const text = messages[0].text;

        firebase.firestore().collection('TestMessages').add({
            text,
            createdAt: new Date().getTime(),
             user: {
                _id: 'Ming',
                email: 'chris@uconn.edu'
            } 
        });
    }


    useEffect(() => {
        const messagesListener = firebase.firestore()
            .collection('TestMessages')
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

                    if (!collectionData.system) {
                        data.user = {
                            ...collectionData.user,
                            name: collectionData.user.email
                        };
                    }

                    return data;
                });

                setMessages(messages);
            });
        return () => messagesListener();
    }, []);

    return (
        <GiftedChat
            messages={messages}
            onSend={handleSend}
            //user={{ _id: user.uid }}
            placeholder='Type your message here...'
            alwaysShowSend
            scrollToBottom
        />
    );
}

const styles = StyleSheet.create({

});
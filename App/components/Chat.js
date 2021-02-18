import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../firebase';

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

export default function App({ navigation }) {
    return(
        <View>
            <Text>Welcome to the chat screen!</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});
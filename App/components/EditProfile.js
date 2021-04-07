import firebase from 'firebase';
import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Auth } from '../contexts/AuthContext';
import { Profile } from '../contexts/ProfileContext';

function ProfileImage(props) {
    if (props.thumbnail) {
        return (<View style={styles.thumbnail_container}>
            <Image source={{ uri: props.thumbnail }} style={styles.thumbnail} />
        </View>);
    } else {
        return (<View style={styles.thumbnail_container}>
            <Image source = {require("../assets/default-thumbnail.png")} style={styles.thumbnail}/>
        </View>);
    };
};

export default function App({ route, navigation }) {
    const thumbnail = route.params;
    const { bio, setBio } = useContext(Profile);
    const { user } = useContext(Auth);
    const currentUser = user.toJSON();
    
    const nametest = user.displayName;
    const [name, setName] = useState(nametest ? nametest : ''); 

    const uploadData = async () => {
        await firebase.firestore()
        .collection('PROFILES')
        .doc(currentUser.uid)
        .set({
            name: name,
            bio: bio
        }, {merge: true});
    };

    return (

        <View style={styles.container}>
            <ProfileImage thumbnail={thumbnail}/>

            <View style={styles.nameInputView}>
                <TextInput
                    style={styles.nameTextInput}
                    placeholder="Name:"
                    placeholderTextColor="#003f5c"
                    value={name}
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.bioInputView}>
                <TextInput
                    style={styles.bioTextInput}
                    placeholder="Bio:"
                    placeholderTextColor="#003f5c"
                    multiline={true}
                    value={bio}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    onChangeText={(bio) => setBio(bio)}
                    />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={() => {
                user.updateProfile({displayName: name});
                uploadData();
                navigation.navigate('Profile');
                }}>
                <Text style={styles.loginText}>Save Edits</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    loginText: {
        color: 'white',
    }, 

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        backgroundColor: "#2174C3",
    },
    nameInputView: {
        backgroundColor: "#C2E0F9",
        borderRadius: 10,
        width: "80%",
        height: 45,
        marginBottom: 10,
    },
    bioInputView: {
        backgroundColor: "#C2E0F9",
        borderRadius: 10,
        width: "80%",
        height: 180,
        lineHeight: 45,
        marginBottom: 10
    },
    nameTextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 10,
    },
    bioTextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginTop: 5,
        marginLeft: 10,
    },
    thumbnail_container: {
        alignItems:"center",
        paddingTop: 30,
        paddingBottom: 30
    },
    thumbnail: {
        width: 150,
        height: 150,
        borderRadius: 400/ 2
    }
});
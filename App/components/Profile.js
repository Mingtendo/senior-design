import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from '../firebase';
import { Auth } from '../contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import {Profile} from '../contexts/ProfileContext';

export default function App({ navigation }) {

    const { logout, user } = useContext(Auth);
    const {imageUrl} = useContext(Profile);
    const currentUser = user.toJSON();

    const [Courses, setCourses] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePickerAsync = async () => {
        //let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync();
            if (capturedImage.cancelled) {
                return;
            }
            setSelectedImage({ localUri: capturedImage.uri });


            const imageName = 'profile' + currentUser.uid;
            let uri = capturedImage.uri;
            let newUri = uri.replace('file://', '')

            const response = await fetch(newUri);
            const blob = await response.blob();
            console.log(newUri);
            await firebase.storage().ref().child("PROFILE_IMAGES/" + imageName + ".jpg").put(blob, {contentType: 'image/jpeg'})
                .then((snapshot) => {
                    console.log(`${imageName} has been successfully uploaded.`);
                })
                .catch((e) => {
                    console.log('uploading image error');
                })
            const download = await firebase.storage().ref().child("PROFILE_IMAGES/" + imageName + ".jpg").getDownloadURL();
            user.updateProfile({photoURL: download});
        }
    };

    function ProfileImage(props) {
        const imageSelected = props.imageSelected;
        if (imageSelected) {
            return (<View style={styles.container}>
                <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
            </View>);
        }
        else if(currentUser.photoURL){
            console.log("We are here");
            return (<View style={styles.container}>
                <Image source={{ uri: currentUser.photoURL }} style={styles.thumbnail} />
            </View>);
        }

        //Maybe blank profile screen or Icon
        return <View></View>
    };

    useEffect(() => {
        const profilesListener = firebase.firestore()
            .collection('PROFILES')
            .doc(currentUser.uid)
            .onSnapshot(query => {
                const profileData = query.data();
                var courseList = [];
                if (profileData) {
                    courseList = profileData.courseList
                }
                setCourses(courseList);
            });
        return () => profilesListener();
    }, []);

    return (
        <View style={styles.container}>
            <Text>Profile page will be listed here</Text>

            <ProfileImage imageSelected={selectedImage} />

            <TouchableOpacity style={styles.loginBtn} onPress={openImagePickerAsync}>
                <Text style={styles.loginText}>Upload a profile picture</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => { navigation.navigate('Courses', { Courses }) }}>
                <Text style={styles.loginText}>Select Courses</Text>
            </TouchableOpacity>


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
    },
    thumbnail: {
        width: 150,
        height: 150,
        resizeMode: "contain"
    }
});
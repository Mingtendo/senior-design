import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import firebase from '../firebase';
import { Auth } from '../contexts/AuthContext';
import { Profile } from '../contexts/ProfileContext';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'

function ProfileImage(props) {
    const imageSelected = props.imageSelected;
    if (imageSelected) {
        return (<View style={styles.thumbnail_container}>
            <TouchableOpacity onPress={openImagePickerAsync}>
                <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
            </TouchableOpacity>
        </View>);
    }
    else if(currentUser.photoURL){
        return (<View style={styles.thumbnail_container}>
            <TouchableOpacity onPress={openImagePickerAsync}>
                <Image source={{ uri: currentUser.photoURL }} style={styles.thumbnail} />
            </TouchableOpacity>
        </View>);
    }
    return (<View style={styles.thumbnail_container}>
        <TouchableOpacity onPress={openImagePickerAsync}>
            <Image source = {require("../assets/default-thumbnail.png")} style={styles.thumbnail}/>
        </TouchableOpacity>
    </View>);
};

export default function App({ navigation }) {
    const { bio, setBio} = useContext(Profile);
    const { logout, user } = useContext(Auth);
    const currentUser = user.toJSON();

    const nametest = user.displayName;
    const [name, setName] = useState(nametest ? nametest : ''); 

    const [Courses, setCourses] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePickerAsync = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchImageLibraryAsync();
            if (capturedImage.cancelled) {
                return;
            }
            setSelectedImage({ localUri: capturedImage.uri });

            const imageName = 'profile' + currentUser.uid;
            //Do this for iOS
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
            return (<View style={styles.thumbnail_container}>
                <TouchableOpacity onPress={openImagePickerAsync}>
                    <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
                </TouchableOpacity>
            </View>);
        }
        else if(currentUser.photoURL){
            return (<View style={styles.thumbnail_container}>
                <TouchableOpacity onPress={openImagePickerAsync}>
                    <Image source={{ uri: currentUser.photoURL }} style={styles.thumbnail} />
                </TouchableOpacity>
            </View>);
        }
        return (<View style={styles.thumbnail_container}>
            <TouchableOpacity onPress={openImagePickerAsync}>
                <Image source = {require("../assets/default-thumbnail.png")} style={styles.thumbnail}/>
            </TouchableOpacity>
        </View>);
    };

    useEffect(() => {
        const profilesListener = firebase.firestore()
            .collection('PROFILES')
            .doc(currentUser.uid)
            .onSnapshot(query => {
                const profileData = query.data();
                var courseList = [];
                var name = '';
                var bio = '';
                if (profileData) {
                    if (profileData.hasOwnProperty('courseList')){
                        courseList = profileData.courseList;
                    }
                    if (profileData.hasOwnProperty('name')){
                        name = profileData.name;
                    }
                    if (profileData.hasOwnProperty('bio')){
                        bio = profileData.bio;
                    }
                }
                setCourses(courseList);
                setBio(bio);
                setName(name);
            });
        return () => profilesListener();
    }, []);

    return (
        <View style={styles.container}>
            <ProfileImage imageSelected={selectedImage}/>

            <Text>{name}</Text>

            <Text>{bio}</Text>

            <TouchableOpacity style={styles.loginBtn} onPress={() => { 
                let thumbnail = '';
                if(selectedImage){
                    thumbnail = selectedImage.localUri;
                } else if(currentUser.photoURL){
                    thumbnail = currentUser.photoURL;
                };
                navigation.navigate('EditProfile', thumbnail); }}>
                <Text style={styles.loginText}>Edit Profile</Text>
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
    thumbnail_container: {
        alignItems:"center",
        paddingTop: 50,
        paddingBottom: 10
    },
    thumbnail: {
        width: 150,
        height: 150,
        borderRadius: 400/ 2
    }
});
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Auth} from '../contexts/AuthContext';
import {Profile} from '../contexts/ProfileContext';
import Courses from '../courses.json'
import firebase from '../firebase';

export default function App({ route, navigation }) {
    const currentCourses = route.params.Courses;
    const [selectedCourses, setselectedCourses] = useState(currentCourses ? currentCourses : []); 
    const {setCourses} = useContext(Profile);
    const { user } = useContext(Auth);
    const currentUser = user.toJSON();

    async function updateCourseList(courses){
        await firebase.firestore()
        .collection('PROFILES')
        .doc(currentUser.uid)
        .set({
            courseList: courses
        }, {merge: true});
        setCourses(courses);
    }

    return (
        <View>
            <SearchableDropdown
                multi={true}
                selectedItems={selectedCourses}
                onItemSelect={(item) => {
                    const updatedCourses = selectedCourses;
                    updatedCourses.push(item);
                    setselectedCourses(updatedCourses);
                }}
                items={Courses.courses}
                listProps={
                    {
                        nestedScrollEnabled: true,
                    }
                }
                chip={true}
                resetValue={true}
                onRemoveItem={(item) => {
                    const updatedCourses = selectedCourses.filter((sitem) => sitem.id !== item.id);
                    setselectedCourses(updatedCourses);
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    alignItems: "center",
                    backgroundColor: "#C2E0F9",
                    borderColor: "#C2E0F9",
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: "#C2E0F9"}}
                itemsContainerStyle={{ maxHeight: 140}}
                textInputProps={
                    {
                        placeholder: "Select Courses",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: "#C2E0F9",
                            borderRadius: 5,
                        }
                    }
                } 
             />
                <TouchableOpacity style={styles.loginBtn} onPress={() => {
                updateCourseList(selectedCourses);
                navigation.navigate('Profile');
                }}>
                <Text style={styles.loginText}>Update Courses</Text>
                </TouchableOpacity>   
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",

    },

    loginText: {
        color: 'white',
        
    }, 

    loginBtn: {
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#2174C3",
    }
});
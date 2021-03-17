import React, { Fragment, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import SearchableDropdown from 'react-native-searchable-dropdown';
import {Auth} from './AuthContext';

import Courses from '../courses.json'
import firebase from '../firebase';



export default function App({ route, navigation }) {
    const currentCourses = route.params.Courses;
    const [selectedCourses, setselectedCourses] = useState(currentCourses);
    console.log(currentCourses);

    const { user } = useContext(Auth);
    const currentUser = user.toJSON();

    async function updateCourseList(courses){
        await firebase.firestore()
        .collection('PROFILES')
        .doc(currentUser.uid)
        .set({
            courseList: {
                courses
            }
        }, { merge: true });
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
                resetValue={false}
                onRemoveItem={(item, index) => {
                    const updatedCourses = selectedCourses.filter((sitem) => sitem.id !== item.id);
                    setselectedCourses(updatedCourses);
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#ddd',
                    borderColor: '#bbb',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 140 }}
                textInputProps={
                    {
                        placeholder: "placeholder",
                        underlineColorAndroid: "transparent",
                        style: {
                            padding: 12,
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 5,
                        },
                        onTextChange: text => console.log(text)
                    }
                } 
             />
             <TouchableOpacity style={styles.loginBtn} onPress={() => updateCourseList(selectedCourses)}>
                <Text style={styles.loginText}>UPDATE COURSES</Text>
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
    }
});
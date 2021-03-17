import React, { Fragment, useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Courses from '../courses.json'

import SearchableDropdown from 'react-native-searchable-dropdown';

export default function App({ navigation }) {

    const [selectedCourses, setselectedCourses] = useState([]);

    return (
        <View>
            <SearchableDropdown
                    multi={true}
                    selectedItems={selectedCourses}
                    onItemSelect={(item) =>
                        setselectedCourses([item, ...selectedCourses])
                    }
                    items={Courses.courses.map(item => item)}
                    listProps={
                        {
                            nestedScrollEnabled: true,
                        }
                    }
                    chip={true}
                    resetValue={false}
                    onRemoveItem={(item, index) => {
                        const updatedCourses = selectedCourses.filter((sitem) => sitem !== item);
                        setselectedCourses({updatedCourses});
                        }   
                    }
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
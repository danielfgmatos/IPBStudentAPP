import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';


const  ModalButton = ({text , onPress}) => {

    return (
        <View style={styles.button}>
            <TouchableOpacity onPress={()=> onPress(false)}>
                <Text style={styles.buttonText}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ModalButton;


const styles = StyleSheet.create({
button: {
    marginTop:15,
    padding: 5,
    backgroundColor: "#811B55",
    borderRadius: 10,
    alignSelf: "center",
    shadowOffset : { width: 56, height: 13},
    shadowColor: 'black',
    shadowOpacity: 0.8,
},

    buttonText: {
    color: 'white',
        textAlign: "center",

    }



})
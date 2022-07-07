import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const EditarHorarioButton = ({onPress, setPersonalizar,value, title, icon, valueRemover}) => {
    return (
        <TouchableOpacity onPress={() => {if(value===true){onPress(false); setPersonalizar(false)} if(value===false){
            valueRemover(false)
            onPress(true)
        }}} style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.buttonText}>{title}</Text>
                <Ionicons
                    style={styles.icon}
                    name={icon}
                    size={20}
                    color="white"
                />
            </View>
        </TouchableOpacity>
    );
};

export default EditarHorarioButton;

const styles = StyleSheet.create({
    icon: {
        alignSelf: "flex-end",
        flex: 1,
        alignItems: "flex-end",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        flex: 5,
        paddingLeft: 20,
    },
    container: {
        alignItems: "center",
        shadowRadius: 10,
        shadowColor: "#811B55",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        backgroundColor: "#811B55",
        flex: 1,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        alignItems: "center",
        justifyContent: "center",
        shadowRadius: 10,
        shadowColor: "#811B55",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
    },

    menu: {
        backgroundColor: "#811B55",
    },
});

import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import ModalButton from "./ModalButton";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import {format, parseISO} from "date-fns";


const BlocoInfo = ({ values, setModalOpen}) => {

    const mySubString = values.description.substring(
        values.description.indexOf("[") + 1,
        values.description.length - 1,
    );


    return (
        <Modal transparent>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.tituloModal}>{values.description}</Text>

                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalOpen(false)}
                        >
                            <Ionicons name="close-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalContainer}>
                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Horário: </Text>
                        <Text style={styles.modalData}>{format(values.startDate,'H:mm').toString()} - {format(values.endDate,'H:mm').toString()}</Text>
                    </View>



                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Sala:</Text>
                        <Text style={styles.modalData}>{values.sala}</Text>
                    </View>
                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Turno: </Text>
                        <Text style={styles.modalData}>{mySubString}</Text>
                    </View>

                    <ModalButton text="Fechar" onPress={setModalOpen} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default BlocoInfo;

const styles = StyleSheet.create({
    modalContainer: {
        padding: 15,
    },
    subtitulo: {
        fontWeight: "bold",
        color: "#811B55",
        padding: 10,
    },
    tituloModal: {
        flex: 5,
        color: "white",
        fontSize: 15,
        textAlign: "center",
        marginLeft: "18%",
    },

    modalHeader: {
        flexDirection: "row",
        backgroundColor: "#811B55",
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingVertical: 5,
        elevation: 5,
    },
    closeButton: {
        flex: 1,
        alignItems: "flex-end",
    },

    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 20,
        paddingBottom: 15,
    },
    modalHeadersView:{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth:1,
        borderBottomColor:"#811B55",
    },
    modalHeaders:{
        alignSelf:"center",
        fontWeight: "bold",
        color: "#811B55",
        padding:10,
    },
    modalData:{
        alignSelf: "center",
        padding: 15,
    }
});


import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import {View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView} from "react-native";
import {format, parseISO} from "date-fns";
import ModalButton from "../../../HomeScreen/HomeScreenComponents/ModalButton";
import api from "../../../../services/api/api";


const ModalAvisoInfo = ({values, setModalOpen, userContext, setIncrement, increment}) => {


    return (
        <Modal transparent>
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        {/*
                        {renderTipo(item.tipo)}
*/}
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalOpen(false)}
                        >
                            <Ionicons name="close-outline" size={20} color="white"/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalContainer}>

                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Assunto:</Text>
                        <Text style={styles.modalData}>{values.assunto}</Text>
                    </View>

                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Autor:</Text>
                        <Text style={styles.modalData}>{values.autor}</Text>
                    </View>

                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Data do aviso:</Text>
                        <Text style={styles.modalData}>{values.data_modificado}</Text>
                    </View>


                    <Text style={styles.modalHeaders}>Conteúdo:</Text>
                    <ScrollView style={{flexGrow: 1, height: 200}}>
                        <Text style={styles.modalData}>{values.conteudo}</Text>
                    </ScrollView>

                    <ModalButton text="Fechar" onPress={() => setModalOpen(false)}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
export default ModalAvisoInfo;

const styles = StyleSheet.create({
    modalContainer: {
        padding: 10,
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
        flex:1,
        justifyContent:"space-between",
        alignSelf:"center",
        fontWeight: "bold",
        color: "#811B55",
        padding:1,
        paddingTop:5,
    },
    modalData:{
        flex:1,
        alignSelf: "center",
        padding: 15,
    }
});


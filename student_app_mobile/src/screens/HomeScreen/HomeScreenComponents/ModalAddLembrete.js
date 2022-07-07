
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalButton from "./ModalButton";
import {View, Text, StyleSheet,TouchableOpacity, Modal} from 'react-native';
import FormAddLembrete from "./FormAddLembrete";


const ModalAddLembrete = ({values, setModalAddOpen, setNewLembrete}) => {




    return (

        <Modal  transparent>
            <View style={styles.modalBackground}>

                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>

                        <Text style={styles.tituloModal}>Adicionar Lembrete</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={()=>setModalAddOpen(false)}>
                            <Ionicons name="close-outline" size={20} color="white" />
                        </TouchableOpacity>
                    </View>

                <FormAddLembrete setNewLembrete={setNewLembrete} setModalOpen={setModalAddOpen}/>




                </View>
            </View>
        </Modal>


    )
}
export default ModalAddLembrete;


const styles = StyleSheet.create({
    subtitulo: {
        fontWeight: "bold",
        color: "#811B55",
        padding: 10,
    },
    tituloModal: {
        flex: 5,
        color: "white",
        fontSize: 15,
        textAlign: 'center',
        marginLeft: "18%",
    },

    modalHeader:{

        flexDirection: "row",
        backgroundColor:"#811B55",
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
});


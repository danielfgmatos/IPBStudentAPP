
import React, {useContext} from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import {View, Text, StyleSheet,TouchableOpacity, Modal} from 'react-native';
import {Picker} from "@react-native-picker/picker";
import {Formik} from "formik";

import {UserContext} from "../../../../context/UserContext";
import FeatherIcons from "@expo/vector-icons/Ionicons";
import apiLogin from "../../../../services/api/apiLogin";
import api from "../../../../services/api/api";




const ModalPersonalizarBloco = ({values, setModalPersonalizarOpen, setUpdate}) => {
const cores = [
    {
        id: 1,
        cor: "red",
        nome: "Vermelho",
    },
    {
        id: 2,
        cor: "yellow",
        nome: "Amarelo"
    },
    {
        id: 3,
        cor: "blue",
        nome: "Azul",
    },
    {
        id: 4,
        cor: "green",
        nome: "Verde",
    },
    {
        id: 5,
        cor: "black",
        nome: "Preto",
    },
    {
        id: 6,
        cor: "brown",
        nome: "Castanho"
    },
    {
        id: 7,
        cor: "purple",
        nome: "Roxo"
    },
]
    const {userContext} = useContext(UserContext);
    const personalizarForm = {

        numero_mecanografico_fk: userContext[0].numero_mecanografico,
       color: values.color,
        nome: values.description,
        id: values.id
    };

    const removerBloco  = async (values) => {
        setUpdate(true);

        setModalPersonalizarOpen(false);
        await api
            .get(`/bloco-aula/update-visibilidade/?id_bloco=${values.id}&visibility=0`,{headers:{ Authorization: `Bearer ${userContext[0].token}`}} )
            .then((response) => {
              setUpdate(false);
            })
            .catch((error) => {
                console.log(error.response.request);
            });

    }

    const submeterForm = async (values) => {
        setUpdate(true);
        setModalPersonalizarOpen(false);
      await api
            .get(`/bloco-aula/update-cor-bloco/?id_bloco=${values.id}&cor=${values.color}`,{headers:{ Authorization: `Bearer ${userContext[0].token}`}} )
            .then((response) => {
                setUpdate(false);
            })
            .catch((error) => {
                console.log(error.response.request);
            });
    }

    return (


        <Modal  transparent>
            <View style={styles.modalBackground}>

                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>

                        <Text style={styles.tituloModal}>Editar Bloco</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={()=>setModalPersonalizarOpen(false)}>
                            <Ionicons name="close-outline" size={20} color="white" />
                        </TouchableOpacity>


                    </View>


    <Formik
        initialValues={personalizarForm}
        onSubmit={(values) => {

            submeterForm(values);

        }}
    >
        {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                setFieldValue,
                touched,
                errors,
            })=> (
            <View style={styles.modalContainer}>
                <View style={styles.container}>

                        <View style={styles.iconStyles}>
                            <FeatherIcons name="color-palette-outline" size={18} color="#811B55" />
                        </View>
                    <Picker
                        style={styles.dropDownStyle}
                        selectedValue={values.color}
                        onValueChange={(itemValue, itemIndex) =>
                            setFieldValue("color",itemValue)
                        }
                    >

                        <Picker.Item label="Selecione uma cor" value={null}/>
                        {cores &&
                            Object.keys(cores).map((key) => {
                                return (

                                    <Picker.Item
                                        label={cores[key].nome}
                                        value={cores[key].cor}
                                        key={key}
                                    />
                                );
                            })}
                    </Picker>



                </View>
                <View style={{ justifyContent:"space-between", paddingTop: 15 , flexDirection: "row"}}>
                    <TouchableOpacity onPress={()=>removerBloco(values)}>
                        <View style={styles.buttonSubmit}>
                            <Text style={styles.buttonText}>Remover Bloco</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit}>
                        <View style={styles.buttonSubmit}>
                            <Text style={styles.buttonText}>Submeter</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )}

    </Formik>




                </View>
            </View>
        </Modal>


    )
}
export default ModalPersonalizarBloco;


const styles = StyleSheet.create({
    container2:{
        flexDirection: "row",
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
        textAlign: 'center',
        marginLeft: "18%",
    },
    dropDownStyle: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
        borderColor: "#811B55",
        borderBottomWidth: 1,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,
    },
    iconStylesDropDown: {

        paddingLeft: 10,
        position: "relative",
        paddingRight: 15,
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
    container: {
        flexDirection: "row",

        backgroundColor: "white",
        width: "100%",
        borderColor: "#811B55",
        borderBottomWidth: 1,
        borderBottomRightRadius: 5,
        paddingHorizontal: 10,

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

    },
    buttonSubmit: {
        padding: 5,
        backgroundColor: "#811B55",
        borderRadius: 10,
        alignSelf: "center",
        shadowOffset: { width: 56, height: 13 },
        shadowColor: "black",
        shadowOpacity: 0.8,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
    },
    modalContainer: {

        padding: 15,
    },

    containerDropDown: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#811B55",
        borderBottomRightRadius: 5,
    },

    errorStyle: {
        color: "red",
        fontSize: 12,
        textAlign: "right",
    },
    inputStyle: {
        paddingRight: 25,
    },



    iconStyles: {
paddingTop: 19,
        paddingRight: 20,
    },
});


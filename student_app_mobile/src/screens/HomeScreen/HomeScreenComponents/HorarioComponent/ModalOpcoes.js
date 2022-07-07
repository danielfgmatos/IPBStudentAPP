
import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";

import { UserContext } from "../../../../context/UserContext";
import FeatherIcons from "@expo/vector-icons/Ionicons";
import api from "../../../../services/api/apiLogin";
import parseIsoDate from "yup/es/util/isodate";
import { parseISO } from "date-fns";

const ModalOpcoes = ({
  values,
  setModalOpcoesOpen,
  weekDays,
  setWeekDays,
  setUpdate,
  setLoading,
    endAgendaAt,
    setEndAgendaAt,
    beginAgendaAt,
    setBeginAgendaAt,
    setHoursInDisplay,
    hoursInDisplay
}) => {
  const { userContext } = useContext(UserContext);
const getHorario  = async () => {
  setUpdate(true);
  setLoading(true);
  setModalOpcoesOpen(false);
    await api
      .get(`/horario/get-horario/?api_key=${userContext[2]}`, {
        headers: { Authorization: `Bearer ${userContext[0].token}` },
      })
      .then((response) => {

      })
      .catch((error) => alert(error));
  }

  return (
    <Modal transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.tituloModal}>Opções</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOpcoesOpen(false)}
            >
              <Ionicons name="close-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContainer}>
            <View style={styles.container}>
              <Text style={styles.subtitulo}>Nº de dias a apresentar: </Text>
              <Picker
                style={styles.dropDownStyle}
                selectedValue={weekDays}
                onValueChange={(itemValue, itemIndex) => setWeekDays(itemValue)}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="3" value={3} />
                <Picker.Item label="5" value={5} />
                <Picker.Item label="7" value={7} />
              </Picker>
            </View>

              <View style={styles.container}>
                  <Text style={styles.subtitulo}>Início do horário: </Text>
                  <Picker
                      style={styles.dropDownStyle}
                      selectedValue={beginAgendaAt}
                      onValueChange={(itemValue, itemIndex) => setBeginAgendaAt(itemValue)}
                  >
                      <Picker.Item label="7:00h" value={7*60} />
                      <Picker.Item label="8:00h" value={8*60} />
                      <Picker.Item label="9:00h" value={9*60} />
                      <Picker.Item label="10:00h" value={10*60} />
                      <Picker.Item label="11:00h" value={11*60} />
                      <Picker.Item label="12:00h" value={12*60} />
                      <Picker.Item label="13:00h" value={13*60} />
                  </Picker>
              </View>

              <View style={styles.container}>
                  <Text style={styles.subtitulo}>Fim do horário: </Text>
                  <Picker
                      style={styles.dropDownStyle}
                      selectedValue={endAgendaAt}
                      onValueChange={(itemValue, itemIndex) => setEndAgendaAt(itemValue)}
                  >
                      <Picker.Item label="16:00h" value={16*60} />
                      <Picker.Item label="17:00h" value={17*60} />
                      <Picker.Item label="18:00h" value={18*60} />
                      <Picker.Item label="19:00h" value={19*60} />
                      <Picker.Item label="20:00h" value={20*60} />
                      <Picker.Item label="21:00h" value={21*60} />
                      <Picker.Item label="22:00h" value={22*60} />
                      <Picker.Item label="23:00h" value={23*60} />
                      <Picker.Item label="24:00h" value={24*60} />
                  </Picker>
              </View>

              <View style={styles.container}>
              <Text style={styles.subtitulo}>
                Obter nova versão do horário:{" "}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  getHorario();
                }}
              >
                <View style={{ marginLeft: 55 }}>
                  <Ionicons name="cloud-download" size={25} color="#811B55" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 15, flexDirection: "row", justifyContent:"center"}}>
              <TouchableOpacity onPress={() => setModalOpcoesOpen(false)}>
                <View style={styles.buttonSubmit}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default ModalOpcoes;

const styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
  },
  subtitulo: {
    fontWeight: "bold",
    color: "#811B55",
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
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderColor: "#811B55",
    borderBottomWidth: 1,
    paddingHorizontal: 1,
    paddingVertical:5,
    justifyContent:"space-evenly",
    alignItems:"center",
  },
  dropDownStyle: {
    flex: 1,
    //marginLeft:50,
    //width:'100%',
    //justifyContent:"space-evenly",
    //alignItems:"center",
    //paddingLeft:150,
    //backgroundColor: "red",
    //width: "100%",
    //marginRight:50,
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
  buttonObter: {
    flex: 1,
    padding: 5,
    backgroundColor: "#811B55",
    borderRadius: 10,
    paddingLeft: 30,
    shadowOffset: { width: 56, height: 13 },
    shadowColor: "black",
    shadowOpacity: 0.8,
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


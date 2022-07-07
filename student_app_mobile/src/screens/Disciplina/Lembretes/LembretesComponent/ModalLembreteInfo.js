
import React, { useContext, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal, TextInput,
} from "react-native";
import { format, parseISO } from "date-fns";
import ModalButton from "../../../HomeScreen/HomeScreenComponents/ModalButton";
import { DisciplinaContext } from "../../../../context/DisciplinaContext";
import api from "../../../../services/api/api";
import { UserContext } from "../../../../context/UserContext";
import FeatherIcons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {Picker} from "@react-native-picker/picker";
import {Formik} from "formik";
import {InscricaoContext} from "../../../../context/InscricaoContext";
import notifee, {
    AndroidColor,
    AndroidImportance, AndroidStyle,
    AndroidVisibility, RepeatFrequency,
    TimestampTrigger,
    TriggerType
} from "@notifee/react-native";

const ModalLembreteInfo = ({ values, setModalOpen, setUpdate, setModalItem }) => {

  const { disciplina, setDisciplina } = useContext(DisciplinaContext);
  const [editar, setEditar] = useState(false);
    const [datePickerVisible, setDatePickerVisible] = useState(false); // Estado do Date Picker
    const [TimePickerVisible, setTimePickerVisible] = useState(false); //Estado do Time Picker
    const {userContext} = useContext(UserContext);
    const {inscricao} = useContext(InscricaoContext);
    const [disable, setDisable] = useState(false);
    const today = new Date(); //Guarda data de hoje para validação yup
    const [date, setDate] = useState(); //Variavel criada para ser ambos os pickers (Data e Time) serem concatenados
    const [repeticao, setRepeticao] = useState('');
    const [antecedencia, setAntecedencia] = useState('');
    const [alerta, setAlerta] = useState(false);

  const removerLembrete = async (values) => {
    setUpdate(true);
    setModalOpen(false);
    await api
      .get(
        `/lembrete/delete-lembrete/?id_lembrete=${values.id_lembrete}&codigo_disciplina_fk=${values.codigo_disciplina_fk}`,
        { headers: { Authorization: `Bearer ${userContext[0].token}` } }
      )
      .then((response) => {
        setUpdate(false);
          notifee.cancelTriggerNotification(String(values.id_lembrete));
          notifee.cancelDisplayedNotification(String(values.id_lembrete));
      })
      .catch((error) => {
        console.log(error.response.request);
      });
  };

    async function onCreateTriggerNotification(values) {
        // Create a channel
        await notifee.requestPermission();
        await notifee.createChannel({
            id: 'general',
            name: 'Lembrete',
            sound: 'default',
            vibration: true,
            lights: true,
            lightColor: AndroidColor.BLUE,
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PUBLIC,
        })

        const date = new Date(parseISO(values.data_vencimento));
        const dateTemp = new Date((antecedencia === '1') ? date.setMinutes(date.getMinutes()-1) : (antecedencia === '2') ? date.setMinutes(date.getMinutes()-5) : (antecedencia === '3') ? date.setMinutes(date.getMinutes()-10) :
            (antecedencia === '4') ? date.setMinutes(date.getMinutes()-30) : (antecedencia === '5') ? date.setHours(date.getHours()-1) : (antecedencia === '6') ? date.setHours(date.getHours()-3) :
                (antecedencia === '7') ? date.setHours(date.getHours()-6) : (antecedencia === '8') ? date.setHours(date.getHours()-12) : (antecedencia === '9') ? date.setHours(date.getHours()-24) : date.getTime());
        // Create a time-based trigger

        const trigger: TimestampTrigger = {
            alarmManager: {
                allowWhileIdle: true,
            },
            type: TriggerType.TIMESTAMP,
            timestamp: dateTemp.getTime(),
            repeatFrequency: (repeticao === '1') ? RepeatFrequency.HOURLY : (repeticao === '2') ? RepeatFrequency.DAILY : (repeticao === '3') ? RepeatFrequency.WEEKLY : RepeatFrequency.NONE,
        };

        // Create a trigger notification
        await notifee.createTriggerNotification(
            {
                id: String(values.id_lembrete),
                title: (values.tipo === '2') ? '<p style="color: #811B55;"><b>Lembrete</span></p></b></p>' :
                    (values.tipo === '3') ? '<p style="color: #811B55;"><b>Teste</span></p></b></p>' :
                        '<p style="color: #811B55;"><b>Atividade</span></p></b></p>',
                body: values.descricao,
                android: {
                    channelId: 'general',
                    lights: [AndroidColor.BLUE, 300, 600],
                    importance: AndroidImportance.HIGH,
                    showTimestamp: true,
                    largeIcon: require('../../../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png'),
                    circularLargeIcon: true,
                    smallIcon: 'ipb_notification_icons',
                    color: '#811B55',
                    actions: [
                        { pressAction: { id: 'cancelar' }, title: 'Cancelar este lembrete' },
                    ],
                },
            },
            trigger,
        );
    }

    const updateLembrete = async (values) => {
        setUpdate(true);
        setModalOpen(false);
        if(alerta)
        {
            onCreateTriggerNotification(values)
        }
        await api
            .get(
                `/lembrete/update-lembrete/?id_lembrete=${values.id_lembrete}&codigo_disciplina_fk=${values.codigo_disciplina_fk}&tipo=${values.tipo}&data_inicio=${values.data_inicio}&data_vencimento=${values.data_vencimento}&calendar_date=${values.calendar_date}&descricao=${values.descricao}&numero_mecanografico_fk=${values.numero_mecanografico_fk}`,
                { headers: { Authorization: `Bearer ${userContext[0].token}` } }
            )
            .then((response) => {
                setUpdate(false);
            })
            .catch((error) => {
                console.log(error.response.request);
            });
    };
  const renderTipo = (data) => {
    if (data === "1") {
      return <Text style={styles.tituloModal}>Aviso</Text>;
    }

    if (data === "2") {
      return <Text style={styles.tituloModal}>Lembrete</Text>;
    }
    if (data === "3") {
      return <Text style={styles.tituloModal}>Teste</Text>;
    }

    if (data === "4") {
      return <Text style={styles.tituloModal}>Atividade</Text>;
    }
  };

  return (
    <Modal transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            {renderTipo(values.tipo)}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalOpen(false)}
            >
              <Ionicons name="close-outline" size={20} color="white" />
            </TouchableOpacity>
          </View>



            { editar ?
          <View style={styles.modalContainer}>
              <Formik
                  initialValues={values}
                  onSubmit={(values) => {

                      updateLembrete(values);

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
                    }) => (
                      <View style={styles.modalContainer}>
                          <View style={styles.container}>
                              <View style={styles.iconStyles}>
                                  <FeatherIcons name="calendar" size={18} color="#811B55" />
                              </View>
                              <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
                                  <TextInput
                                      editable={false}
                                      style={styles.inputStyle}
                                      placeholder="Data de Lembrete"
                                      value={values.data_vencimento}
                                      onChangeText={handleChange("data_vencimento")}
                                      onBlur={handleBlur("data_vencimento")}
                                  />
                              </TouchableOpacity>
                          </View>
                          {touched.data_vencimento && errors.data_vencimento ? (
                              <Text style={styles.errorStyle}>
                                  {touched.data_vencimento && errors.data_vencimento}
                              </Text>
                          ) : null}

                          {datePickerVisible && (
                              <DateTimePicker
                                  minimumDate={new Date(Date.now())}
                                  is24Hour={true} // Android Only
                                  value={new Date(Date.now())}
                                  // selected={values.data_inicio}
                                  onCancel={() => setDatePickerVisible(false)}
                                  onChange={(e) => {
                                      const { timestamp } = e.nativeEvent;
                                      setDatePickerVisible(false);

                                      if (timestamp) {
                                          setDate(format(timestamp, "yyyy-MM-dd"));
                                          setTimePickerVisible(true);
                                      }
                                  }}
                              />
                          )}
                          {TimePickerVisible && (
                              <DateTimePicker
                                  minimumDate={new Date(Date.now())}
                                  is24Hour={true} // Android Only
                                  value={new Date(Date.now())}
                                  mode={"time"}
                                  onCancel={() => setTimePickerVisible(false)}
                                  onChange={(e) => {
                                      const { timestamp } = e.nativeEvent;
                                      setTimePickerVisible(false);

                                      if (timestamp) {
                                          const dateTime = date + " " + format(timestamp, "H:mm");

                                          setFieldValue("data_vencimento", dateTime);
                                          setFieldValue("calendar_date",dateTime);
                                      }
                                  }}
                              />
                          )}

                          <View style={styles.containerDropDown}>
                              <View style={styles.iconStylesDropDown}>
                                  <FeatherIcons name="bookmark" size={18} color="#811B55" />
                              </View>
                              <Picker
                                  style={styles.dropDownStyle}
                                  selectedValue={values.tipo}
                                  onValueChange={(itemValue, itemIndex) =>
                                      setFieldValue("tipo", itemValue)
                                  }
                              >
                                  <Picker.Item label="Tipo de lembrete" value="" />
                                  <Picker.Item label="Lembrete" value="2" />
                                  <Picker.Item label="Teste" value="3" />
                                  <Picker.Item label="Atividade" value="4" />
                              </Picker>
                          </View>
                          {touched.tipo && errors.tipo ? (
                              <Text style={styles.errorStyle}>
                                  {touched.tipo && errors.tipo}
                              </Text>
                          ) : null}

                          <View style={styles.container}>
                              <View style={styles.iconStyles}>
                                  <FeatherIcons name="create" size={20} color="#811B55" />
                              </View>
                              <TextInput
                                  style={styles.inputStyle}
                                  multiline
                                  placeholder="Descrição"
                                  onChangeText={handleChange("descricao")}
                                  onBlur={handleBlur("descricao")}
                                  value={values.descricao}
                              />
                          </View>
                          {touched.descricao && errors.descricao ? (
                              <Text style={styles.errorStyle}>
                                  {touched.descricao && errors.descricao}
                              </Text>
                          ) : null}
                          <TouchableOpacity onPress={() => setAlerta(!alerta)}>
                              <View style={styles.buttonAlerta}>
                                  <FeatherIcons name="alarm-outline" size={24} color="white"/>
                                  <Text style={{color:'white', fontWeight:'bold', alignSelf:'center',paddingLeft:10}}>Criar Alerta</Text>
                              </View>
                          </TouchableOpacity>

                          { alerta ? (
                              <>
                                  <View style={styles.containerDropDown}>
                                      <View style={styles.iconStylesDropDown}>
                                          <FeatherIcons name="repeat" size={18} color="#811B55" />
                                      </View>
                                      <Picker
                                          style={styles.dropDownStyle}
                                          selectedValue={repeticao}
                                          onValueChange={(itemValue, itemIndex) =>
                                              setRepeticao(itemValue)
                                          }
                                      >
                                          <Picker.Item label="Sem repetição" value="" />
                                          <Picker.Item label="Hora em hora" value="1" />
                                          <Picker.Item label="Diariamente" value="2" />
                                          <Picker.Item label="Semanalmente" value="3" />
                                      </Picker>
                                  </View>
                                  <View style={styles.containerDropDown}>
                                      <View style={styles.iconStylesDropDown}>
                                          <FeatherIcons name="play-back" size={18} color="#811B55" />
                                      </View>
                                      <Picker
                                          style={styles.dropDownStyle}
                                          selectedValue={antecedencia}
                                          onValueChange={(itemValue, itemIndex) =>
                                              setAntecedencia(itemValue)
                                          }
                                      >
                                          <Picker.Item label="Sem antecedência" value="" />
                                          <Picker.Item label="1 minuto Antes" value="1" />
                                          <Picker.Item label="5 minutos Antes" value="2" />
                                          <Picker.Item label="10 minutos Antes" value="3" />
                                          <Picker.Item label="30 minutos Antes" value="4" />
                                          <Picker.Item label="1 hora Antes" value="5" />
                                          <Picker.Item label="3 horas Antes" value="6" />
                                          <Picker.Item label="6 horas Antes" value="7" />
                                          <Picker.Item label="12 horas Antes" value="8" />
                                          <Picker.Item label="24 horas Antes" value="9" />
                                      </Picker>
                                  </View>
                              </>
                          ) : null}
                          <View style={{ paddingTop: 15 , flexDirection: "row", justifyContent: "space-between"}}>
                              <TouchableOpacity disabled={disable} onPress={ ()=> setEditar(false)}>
                                  <View style={styles.buttonSubmit}>
                                      <Text style={styles.buttonText}>Cancelar</Text>
                                  </View>
                              </TouchableOpacity>
                              <TouchableOpacity disabled={disable} onPress={ handleSubmit}>
                                  <View style={styles.buttonSubmit}>
                                      <Text style={styles.buttonText}>Confirmar</Text>
                                  </View>
                              </TouchableOpacity>

                          </View>
                      </View>
                  )}
              </Formik>



          </View>     :
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Descrição:</Text>
                        <Text style={styles.modalData}>{values.descricao}</Text>
                    </View>

                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Criado:</Text>
                        <Text style={styles.modalData}>{values.data_inicio}</Text>
                    </View>

                    <View style={styles.modalHeadersView}>
                        <Text style={styles.modalHeaders}>Data de Vencimento:</Text>
                        <Text style={styles.modalData}>{values.data_vencimento}</Text>
                    </View>


                    <View  style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={() => setEditar(true)}>
                            <View style={styles.buttonSubmit}>
                                <Text style={styles.buttonText}>Editar</Text>
                            </View>
                        </TouchableOpacity>
                        <ModalButton
                            text="Fechar"
                            onPress={() => setModalOpen(false)}
                        />
                        <TouchableOpacity onPress={() => removerLembrete(values)}>
                            <View style={styles.buttonSubmit}>
                                <Text style={styles.buttonText}>Eliminar</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


            }
        </View>
      </View>
    </Modal>
  );
};
export default ModalLembreteInfo;

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
    buttonAlerta:{
        marginTop:5,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#811B55",
        borderRadius: 10,
        shadowOffset: { width: 56, height: 13 },
        shadowColor: "black",
        shadowOpacity: 0.8,
    },
  buttonSubmit: {
    marginTop: 15,
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
  modalHeadersView: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#811B55",
  },
  modalHeaders: {
    flex: 1,
    justifyContent: "space-between",
    alignSelf: "center",
    fontWeight: "bold",
    color: "#811B55",
    padding: 1,
  },
  modalData: {
    flex: 1,
    alignSelf: "center",
    padding: 15,
  },

    container: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        borderColor: "#811B55",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical:10,
    },

    containerDropDown: {
        flexDirection: "row",
        backgroundColor: "white",
        width: "100%",
        borderColor: "#811B55",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical:10,
    },

    errorStyle: {
        color: "red",
        fontSize: 12,
        textAlign: "right",
    },
    inputStyle: {
        paddingRight: 25,
    },

    dropDownStyle: {
        flex: 1,
        backgroundColor: "white",
        width: "100%",
    },
    iconStylesDropDown: {
        paddingRight:10,
        justifyContent:"space-evenly",
    },

    iconStyles: {
        justifyContent:"space-evenly",
        paddingRight: 17,
    },

});


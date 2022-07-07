import React, {
  Component,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Text,
    ScrollView,
    RefreshControl,
    Button, TouchableOpacity,
} from "react-native";
import WeekView, {
  createFixedWeekDate,
  addLocale,
} from "react-native-week-view";
import create from "zustand";
import EditarHorarioButton from "./HomeScreenComponents/EditarHorarioButton";

import BlocoInfo from "./HomeScreenComponents/ModalBlocoInfo";
import api from "../../services/api/apiLogin";
import { UserContext } from "../../context/UserContext";
import { format, parseISO } from "date-fns";
import Loading from "../../components/Loading";
import parseIsoDate from "yup/es/util/isodate";
import EventComponent from "./HomeScreenComponents/HorarioComponent/EventComponent";
import ModalLembreteInfo from "./HomeScreenComponents/ModalLembreteInfo";
import ModalPersonalizarBloco from "./HomeScreenComponents/HorarioComponent/ModalPersonalizarBloco";
import OpcoesButton from "./HomeScreenComponents/OpcoesButton";
import ModalOpcoes from "./HomeScreenComponents/HorarioComponent/ModalOpcoes";
import Ionicons from "@expo/vector-icons/Ionicons";

addLocale("pt", {
  months:
    "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
      "_"
    ),
  monthsShort: "Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez",
  weekdays: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
  weekdaysShort: "Dom._Seg._Ter._Qua._Qui._Sex._Sab.".split("_"),
});
const MyDayComponent = ({ formattedDate, textStyle, isToday }) => (
    isToday ? <View>
      <Text
          style={ { fontWeight: "bold" ,color: "#811B55", fontSize: 18, textAlign: "center", marginTop: 10}}
      >
        {formattedDate}
      </Text>
      <Text
          style={ { fontWeight: "bold" ,color: "#811B55", fontSize: 12, textAlign: "center"}}
      >
        Hoje
      </Text>
    </View>
        :<View>
    <Text
        style={ { color: "#811B55", fontSize: 13, textAlign: "center"}}
    >
      {formattedDate}
    </Text>
    </View>
);

const events = [];

const HorarioEscolarScreen = () => {
  const [personalizar, setPersonalizar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPersonalizarOpen, setModalPersonalizarOpen] = useState(false);
  const [modalOpcoesOpen, setModalOpcoesOpen] = useState(false);
  const [modalItem, setModalItem] = useState(false);
  const [modalItemPersonalizar, setModalItemPersonalizar] = useState(false);
  const [remover, setRemover] = useState(false);
  const [weekDays, setWeekDays] = useState(1);
  const [endAgendaAt, setEndAgendaAt] = useState(23 * 60);
  const [hoursInDisplay, setHoursInDisplay] = useState(10);
  const [beginAgendaAt, setBeginAgendaAt] = useState(7 * 60);
  const [update, setUpdate] = useState(false);
  const [error, setError] = useState();


  const { userContext } = useContext(UserContext);

  const [loading, setLoading] = useState(false);

  const fetchBloco = async () => {
    setLoading(true);

    await api
      .get(`/horario/fetch-horario`, {
        headers: { Authorization: `Bearer ${userContext[0].token}` },
      })
      .then((response) => {
        events.length = 0;
        for (let i = 0; i < response.data.length; i++) {
          const dateInicioDay = new Date(
            parseIsoDate(response.data[i].data_inicio)
          ).getDay();
          const hourInicio = new Date(
            parseIsoDate(response.data[i].data_inicio)
          ).getHours();
          const minInicio = new Date(
            parseIsoDate(response.data[i].data_inicio)
          ).getMinutes();
          const dateFimDay = new Date(
            parseIsoDate(response.data[i].data_fim)
          ).getDay();
          const hourFim = new Date(
            parseIsoDate(response.data[i].data_fim)
          ).getHours();
          const minFim = new Date(
            parseIsoDate(response.data[i].data_fim)
          ).getMinutes();

          events.push({
            id: response.data[i].id_bloco,
            description: response.data[i].nome_disciplina,
            startDate: createFixedWeekDate(
              dateInicioDay,
              hourInicio,
              minInicio
            ),
            endDate: createFixedWeekDate(dateFimDay, hourFim, minFim),
            sala: response.data[i].sala,
            color: response.data[i].cor,
            visible: response.data[i].visivel,
          });
        }
      })
      .then(() => {
setError("");
        setLoading(false);
      }).catch((error)=> {
            setLoading(false);
            if (error.response) {

            setError(error.response.status);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);

        });
  };

  useEffect(() => {
    fetchBloco();

  }, [weekDays, update]);

  const renderModal = (item) => {

    setModalItem(item);
    setModalOpen(true);
  };

  const renderModalPersonalizar = (item) => {
    setModalItemPersonalizar(item);
    setModalPersonalizarOpen(true);
  };

  return (
    <>
      <View style={{ flexDirection: "row" }}>
        <EditarHorarioButton
          icon="color-palette-outline"
          title="Personalizar"
          onPress={() => setPersonalizar(true)}
          setPersonalizar={setPersonalizar}
          valueRemover={setRemover}
          value={personalizar}
        />
        <OpcoesButton
          icon="settings-outline"
          title="Opções"
          setModalOpcoesOpen={setModalOpcoesOpen}
        />
      </View>

        { error === 500  || events === [] ?
        <TouchableOpacity onPress={()=> fetchBloco()} style={styles.carregarHorario}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.buttonText}>Carregar horário </Text>
                <Ionicons
                    style={styles.icon}
                    name="cloud-download"
                    size={20}
                    color="white"
                />
            </View>
        </TouchableOpacity> : null }
      {personalizar ? (
        <Text
          style={{
            color: "#811B55",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Selecione o blocos de aula que pretende editar!
        </Text>
      ) : null}
      {modalPersonalizarOpen ? (
        <ModalPersonalizarBloco
          values={modalItemPersonalizar}
          setModalPersonalizarOpen={setModalPersonalizarOpen}
          setUpdate={setUpdate}
        />
      ) : null}
      {modalOpcoesOpen ? (
        <ModalOpcoes

          hoursInDisplay={hoursInDisplay}
          beginAgendaAt={beginAgendaAt}
          endAgendaAt={endAgendaAt}
          weekDays={weekDays}
          setWeekDays={setWeekDays}
          setModalOpcoesOpen={setModalOpcoesOpen}
          setLoading={setLoading}
          setUpdate={setUpdate}
          setBeginAgendaAt={setBeginAgendaAt}
          setEndAgendaAt={setEndAgendaAt}
          setHoursInDisplay={setHoursInDisplay}
        />
      ) : null}
      {remover ? (
        <Text
          style={{
            color: "#811B55",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Selecione os blocos de aula que pretende remover!
        </Text>
      ) : null}
      {modalOpen ? (
        <BlocoInfo values={modalItem} setModalOpen={setModalOpen} />
      ) : null}
      {loading ? (
        <Loading />
      ) : (
          <ScrollView refreshControl={
              <RefreshControl
                  refreshing={false}
                  onRefresh={() => fetchBloco()}  /> }>
        <WeekView DayHeaderComponent={MyDayComponent}

          events={events}
          formatDateHeader={"ddd D"}
          locale={"pt"}
          selectedDate={new Date(Date.now())}
          numberOfDays={weekDays}
          weekStartsOn={1}
          startHour={8}
          hoursInDisplay={hoursInDisplay}
          beginAgendaAt={beginAgendaAt}
          endAgendaAt={endAgendaAt}
          EventComponent={EventComponent}
          onEventPress={(event) => {
            if (personalizar === true) {
              setRemover(false);
              renderModalPersonalizar(event);
            }

            if (personalizar === false) {
              renderModal(event);
            }
          }}
        />
          </ScrollView>) }
    </>
  );
};

export default HorarioEscolarScreen;

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#811B55'
    },

    carregarHorario: {
        alignItems: "center",
        shadowRadius: 10,
        shadowColor: "#811B55",
        shadowOpacity: 0.3,
        shadowOffset: { height: 10 },
        backgroundColor: "#811B55",
    },
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
    },
});
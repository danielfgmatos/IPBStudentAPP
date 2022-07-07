import React, { useContext, useEffect, useState} from "react";
import { format, parseISO} from "date-fns";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
} from "react-native";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
} from "react-native-calendars";
import api from "../../services/api/apiLogin";
import AdicionarLembreteButton from "./HomeScreenComponents/AdicionarLembreteButton";
import ModalLembreteInfo from "./HomeScreenComponents/ModalLembreteInfo";
import ModalAddLembrete from "./HomeScreenComponents/ModalAddLembrete";
import {UserContext} from "../../context/UserContext";
import {LocaleConfig} from 'react-native-calendars';
import Loading from "../../components/Loading";
import Ionicons from "@expo/vector-icons/Ionicons";
import notifee, {EventType} from "@notifee/react-native";

const today = new Date().toISOString().split("T")[0];


LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sab.'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt';

const AgendaAluno = () => {
  const weekView = "";
  const [selectedIndex, updateIndex] = useState(0);
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAddOpen, setModalAddOpen] = useState(false);
  const [modalItem, setModalItem] = useState({})
  const [newLembrete, setNewLembrete] = useState(false)
  const {userContext} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [update,setUpdate] = useState(false);


  const themeColor = "#811B55";

  const getMarkedDates = () => {
    const marked = {};
    items.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0) {
        marked[item.title] = { marked: true };
      } else {
        marked[item.title] = { disabled: true };
      }
    });
    return marked;
  };





  const lembretePedido = async () => {
    setLoading(true);

  await api
        .get("/lembrete/get-lembrete/", {headers: {Authorization: `Bearer ${userContext[0].token}`}})
        .then((response) => {

          const reduced = response.data.reduce((acc, currentItem) => {
            const {calendar_date, ...coolItem} = currentItem;

            const found = acc.find(
                (a) => a.title === calendar_date
            );

            if (!found) {
              acc.push({
                title: calendar_date,
                data: [coolItem],
              });
            } else {
              //acc.push({ name: d.name, data: [{ value: d.value }, { count: d.count }] });
              found.data.push(coolItem); // if found, that means data property exists, so just push new element to found.data.
            }

            return acc;
          }, []);

          setItems(reduced.sort((a, b) => (a.title < b.title ? -1 : 1)));
          setLoading(false);

        })
        .catch((error) => console.log(`Can't get Lembretes${error} `));

  };

  useEffect(() => {
    lembretePedido();
    setNewLembrete(false);
    return notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'cancelar' && detail.notification?.id) {
        await notifee.cancelTriggerNotification(detail.notification.id);
        await notifee.cancelDisplayedNotification(detail.notification.id);
      }
    });
  }, [newLembrete, update]);

  const renderItem = (data) => {


    const item = data.item;
    const prazo_lembrete = data.section.title;


    if (!item) {
      return renderEmptyItem();
    }

    const renderTipo = (data) => {
      if (data === '1') {
        return <Text style={styles.itemLocation}>Aviso</Text>
      }

      if (data === '2') {
        return (
            <>

          <Text style={styles.itemLocation}>Lembrete</Text>
              <Ionicons
                  style={styles.icon}
                  name="notifications-outline"
                  size={25}
                  color="#811B55"/>

        </>)
      }
      if (data === '3') {
        return (
            <>

          <Text style={styles.itemLocation}>Teste</Text>
              <Ionicons
                  style={styles.icon}
                  name="school-outline"
                  size={25}
                  color="#811B55"/>
        </>
        )
      }

      if (data === '4') {
        return (<>

            <Text style={styles.itemLocation}>Atividade</Text>
              <Ionicons
                  style={styles.icon}
                  name="document-text-outline"
                  size={25}
                  color="#811B55"
              />
            </>
        )

      }
    }
    //console.log(item);
    return (
        <TouchableOpacity
            onPress={ ()=> renderModal(data)}
            style={styles.item}
        >
          <View style={{ width: 71 }}>
          <Text style={styles.itemEndTime}>{format(parseISO(item.data_vencimento),'H:mm')}h</Text>
          </View>
          <View style={styles.itemCenter}>
            <Text style={styles.itemTitleText}>{item.nome}</Text>
            <View style={styles.itemLocationContainer}>
              {renderTipo(item.tipo)}
            </View>
          </View>
        </TouchableOpacity>
    );
  };
  const renderModal = (item) => {

    setModalItem(item);
    setModalOpen(true);


  };

  const renderAddModal = () => {


    setModalAddOpen(true);

  };

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned 😴</Text>
      </View>
    );
  };

  const onDateChanged = (/* date, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };

  const getTheme = () => {
    const disabledColor = "grey";

    return {
      // arrows
      arrowColor: "black",
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: "black",
      textMonthFontSize: 16,

      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: "black",
      textDayHeaderFontSize: 12,

      textDayHeaderFontWeight: "normal",
      // dates
      todayTextColor: themeColor,
      dayTextColor: themeColor,
      textDayFontSize: 18,

      textDayFontWeight: "500",
      textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: "white",
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: "white",
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 },
    };
  };

  return (
<View style={{ flex: 1 }}>

  { modalOpen && <ModalLembreteInfo values={modalItem} setModalOpen={setModalOpen} setUpdate={setUpdate}/> }
  { modalAddOpen && <ModalAddLembrete  setNewLembrete={setNewLembrete} setModalAddOpen={setModalAddOpen}/> }

  <CalendarProvider
      date={today}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: "white",
      }}
      todayButtonStyle={styles.todayButton}
      todayBottomMargin={16}
    >


      {weekView ? (

        <WeekCalendar firstDay={1} markedDates={getMarkedDates()} />
      ) : (

        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
          // hideKnob
          //initialPosition={ExpandableCalendar.positions.OPEN}
          pastScrollRange={12}
          futureScrollRange={12}
          displayLoadingIndicator={true}
          calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
          theme={getTheme()}
          disableAllTouchEventsForDisabledDays
          // firstDay={1}
          markedDates={getMarkedDates()}
        />
      )}

      <AdicionarLembreteButton setModalOpen={renderAddModal}/>
    {items.length === 0 ? <Text style={{paddingTop: '50%', textAlign: "center", color: "#811B55", fontSize: 25}}>Sem lembretes</Text> : null}

    {loading ? <Loading/> :
      <AgendaList
          pastScrollRange={0}
        markToday={true}
        sections={items}
        onRefresh={lembretePedido}
        refreshing={false}
        extraData={selectedIndex}
        renderItem={(item) => renderItem(item)}

      //sectionStyle={styles.section}
      />
      }

    </CalendarProvider>

</View>

  );
};
export default AgendaAluno;
const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    // backgroundColor: lightThemeColor,
    // color: 'grey',
    // textTransform: 'capitalize',
    // paddingBottom: 0,


  },
  item: {
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    backgroundColor: "white",
  },
  itemStartTime: {
    color: "#474747",
  },
  itemEndTime: {
    color: "#811B55",
    fontSize: 18,
    // marginTop: 4,
    marginLeft: 4,
    marginTop: "10%"

  },
  itemCenter: {
    flex: 1,
  },
  itemTitleText: {
    flex: 1,
    fontSize: 16,
    flexWrap: "wrap",
    fontWeight: "bold",
    color: "black",
  },
  itemLocationContainer: {
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    paddingRight: 10,
  },
  itemLocationIcon: {
    fontSize: 12,
    marginTop: 2,
    marginRight: 2,
  },
  itemLocation: {
    flex: 1,
    fontSize: 12,
    flexWrap: "wrap",
    textAlignVertical: "center",
    color: "#797979",
  },
  itemButtonContainer: {
    width: 80,
    backgroundColor: "green",
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  emptyItemText: {
    color: "grey",
    fontSize: 14,
    alignSelf: "center",
  },
  todayButton: {
    padding: 10,
    height: 45,
    width: 100,
    backgroundColor: "#811B55",
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
    paddingHorizontal: 10,
    paddingVertical: 30,
    borderRadius: 15,
    elevation: 20,
  },
});

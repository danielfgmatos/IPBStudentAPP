
import {Platform, StatusBar, StyleSheet} from "react-native";
import AppNavigation from "./src/components/navigation/routes";
import AuthNavigation from "./src/components/navigation/routes";
import { NavigationContainer } from "@react-navigation/native";
import React, {useState} from "react";
import { UserContext } from "./src/context/UserContext";
import { InscricaoContext } from "./src/context/InscricaoContext";
import {DisciplinaContext} from "./src/context/DisciplinaContext"
import notifee, {EventType} from "@notifee/react-native";

StatusBar.setBarStyle('dark-content');

if (Platform.OS === 'android') {
  StatusBar.setTranslucent(true);
  StatusBar.setBackgroundColor('transparent');
}

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction?.id === 'cancelar' && detail.notification?.id) {
    await notifee.cancelTriggerNotification(detail.notification.id);
    await notifee.cancelDisplayedNotification(detail.notification.id);
  }
});

export default function App() {
  const [userContext, setUserContext] = useState({});
  const [inscricao, setInscricao] = useState();
  const [disciplina, setDisciplina] = useState();

  return (
      <UserContext.Provider value={{ userContext, setUserContext }}>
        <InscricaoContext.Provider value={{ inscricao, setInscricao }}>
          <DisciplinaContext.Provider value={{disciplina, setDisciplina}}>
            <NavigationContainer>
              <AppNavigation />
            </NavigationContainer>
          </DisciplinaContext.Provider>
        </InscricaoContext.Provider>
      </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    alignItems: "center",
    justifyContent: "center",
  },
});

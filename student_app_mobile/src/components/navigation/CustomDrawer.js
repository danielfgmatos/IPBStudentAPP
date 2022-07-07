import React, { useState, useEffect, useContext } from "react";
import { Text, SafeAreaView, View, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import api from "../../services/api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiLogin from "../../services/api/apiLogin";
import { UserContext } from "../../context/UserContext";
import { InscricaoContext } from "../../context/InscricaoContext";
import AvisosScreen from "../../screens/Disciplina/Avisos/AvisosScreen";

const CustomDrawerContent = (props) => {
  const { userContext } = useContext(UserContext);
  const { inscricao } = useContext(InscricaoContext);

  const logout = () => {
    apiLogin.get("login/logout/").then((response) => {
      removeValue()
          .then(props.navigation.replace("LoginScreen"));
    });
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('@storage_Key')
    } catch(e) {
      // remove error
    }
    console.log('Done.')
  }

  return (
    <SafeAreaView
      style={styles.customDrawerStyle}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <DrawerContentScrollView {...props}>
        <View style={{ flex: 1, backgroundColor: "#811B55" }}>
          <Image
            source={require("../../../assets/logoipb_white.png")}
            style={{
              width: 300,
              height: 100,
              resizeMode: "center",
            }}
          />
        </View>
        <View style={styles.userDataStyle}>
          <Text style={styles.userText}>{userContext[0].nome}</Text>
          <Text style={styles.userText}>{userContext[0].email}</Text>
        </View>
        <View style={{ flex: 1, borderTopWidth: 0.6, borderColor: "#811B55" }}>
          <DrawerItemList {...props} />

          {Object.keys(inscricao).map((key) => {
            return (
              <DrawerItem
                options={{ unmountOnBlur: true }}
                style={styles.collapsibleTitle}
                inactiveTintColor="white"
                key={inscricao[key].codigo_disciplina}
                label={inscricao[key].nome}
                onPress={() => {
                  props.navigation.navigate("Disciplina", {screen: 'Avisos', params: {
                    inscricao: inscricao[key],
                    userContext,
                    }});
                }}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>
      <View style={{ borderTopWidth: 0.5, borderColor: "#811B55" }}>
        <DrawerItem
          inactiveTintColor="white"
          labelStyle={{ fontWeight: "bold" }}
          label="Sair"
          onPress={() => {
            logout();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  customDrawerStyle: {
    flex: 1,
    backgroundColor: "#811B55",
  },

  userDataStyle: {
    paddingTop: 30,
    paddingBottom: 20,
    alignItems: "center",
  },
  userText: {
    color: "white",
  },

  collapsibleStyle: {
    alignItems: "flex-start",
  },

  collapsibleTitle: {
    borderRightColor: "white",
    shadowRadius: 5,
    shadowColor: "white",
    borderBottomColor: "white",
  },
});



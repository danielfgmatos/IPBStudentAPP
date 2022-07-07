import React from "react";
import {Image, StatusBar, Dimensions, Platform, TouchableOpacity, View} from "react-native";
import "react-native-gesture-handler";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import CustomDrawerContent from "./CustomDrawer";
import {DrawerActions} from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BackHandler } from 'react-native';

import { UserContext } from "../../context/UserContext";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

//LOGIN
import LoginComponent from '../../screens/LoginScreen/LoginScreen';

//LOADING
import LoadingComponent from '../../screens/LoginScreen/LoadingScreen';

//HOME - AGENDA/HORÁRIO ESCOLAR
import HomeComponent from "../../screens/HomeScreen/HomeScreen";


//DRAWER - LEMBRETES
import LembretesComponent from "../../screens/Lembretes/LembretesScreen";
import LembreteDetalheComponent from "../../screens/Lembretes/LembreteDetalheScreen";
import NovoLembreteComponent from "../../screens/Lembretes/NovoLembreteScreen";

//DISCIPLINA//
//DISCIPLINA - AVISOS
import AvisosComponent from "../../screens/Disciplina/Avisos/AvisosScreen";


//DISCIPLINA - ATIVIDADES
import AtividadesComponent from "../../screens/Disciplina/Atividades/AtividadesScreen";

//DISCIPLINA - LEMBRETES
import LembretesDisciplinaComponent from "../../screens/Disciplina/Lembretes/LembretesDisciplinaScreen";
import LembreteDisciplinaDetalheComponent from "../../screens/Disciplina/Lembretes/LembreteDisciplinaDetalheScreen";
import NovoLembreteDisciplinaComponent from "../../screens/Disciplina/Lembretes/NovoLembreteDisciplinaScreen";

//DISCIPLINA - MENSAGENS
import MensagensComponent from "../../screens/Disciplina/Mensagens/MensagensScreen";
import MensagemDetalheComponent from "../../screens/Disciplina/Mensagens/MensagemDetalheScreen";
import NovaMensagemComponent from "../../screens/Disciplina/Mensagens/NovaMensagemScreen";

//DISCIPLINA - RECURSOS
import RecursosComponent from "../../screens/Disciplina/Recursos/RecursosScreen";

//DISCIPLINA - TESTES ONLINE
import TestesOnlineComponent from "../../screens/Disciplina/TestesOnline/TestesOnlineScreen";
import AvisosScreen from "../../screens/Disciplina/Avisos/AvisosScreen";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import HorarioEscolarScreen from "../../screens/HomeScreen/HorarioEscolarScreen";

const AppNavigationStack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <AppNavigationStack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="LoadingScreen">
            <Stack.Screen name="LoadingScreen" component={AuthNavigation}/>
        </AppNavigationStack.Navigator>
    )
}

const AuthNavStack = createNativeStackNavigator();

function AuthNavigation(logged) {
    return (
        <AuthNavStack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName={logged ? "LoginScreen" : "LoadingScreen"}
        ><AuthNavStack.Screen name="HomeScreen" component={DrawerRoutes}/>
            <AuthNavStack.Screen name="LoginScreen" component={LoginComponent}/>
        </AuthNavStack.Navigator>
    )
}

function DrawerRoutes({route,navigation}) {

    return (

        <Drawer.Navigator
            style={{paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}
            drawerContent={(props) => <CustomDrawerContent {...props}/>}
            screenOptions={{
                headerStyle:{backgroundColor:'white'},
                headerLeftContainerStyle:{marginLeft:20},
                headerLeft: () => (
                    <View style={{width:140, height:65, marginBottom:5}}>
                    <Image
                        style={{width:'100%', height:'100%'}}
                        source={require("../../../assets/logoipb_sem_texto.png")}
                    />
                    </View>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{paddingLeft:'5%'}} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <Ionicons
                            style={{paddingRight:10}}
                            name="menu"
                            size={30}
                            color="#811B55"/>
                    </TouchableOpacity>
                ),
                headerTitle:'',
                lazy: true,
                headerShown: true, drawerActiveBackgroundColor: "white", drawerActiveTintColor: "#811B55", drawerInactiveTintColor: "white"}}
            initialRouteName="Agenda"
        >
            <Drawer.Screen  name="Agenda/Horario" navigation component={HorarioTopTabNavigation}/>

            <Drawer.Screen
                //initialParams={route.params}
                options={{
                    unmountOnBlur: true,
                drawerItemStyle: {
                    height: 0
                }

            }} name="Disciplina" navigation component={DisciplinaTopTabNavigation}/>
        </Drawer.Navigator>
    )
}

const DisciplinaTopTab = createMaterialTopTabNavigator();

function DisciplinaTopTabNavigation({route}) {

//console.log(route.params.params);
    return (

        <DisciplinaTopTab.Navigator
            initialLayout={{ width: Dimensions.get('window').width }}
            screenOptions={{
                topBarContentContainerStyle:{borderTopColor:'#811B55',borderTopWidth:4,borderColor:'#811B55'},
                topBarStyle:{borderTopColor:'#811B55',borderTopWidth:4,borderColor:'#811B55'},
                lazy: true,
                tabBarScrollEnabled: true,
                tabBarItemStyle: { width: 100 },
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#811B55',
                tabBarIndicatorStyle: {backgroundColor: '#811B55'},
                }}>
            <DisciplinaTopTab.Screen

                name="Avisos" navigation component={AvisosComponent}
                options={{tabBarIcon: () =>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require("../../../assets/png/megaphone-outline.png")}
                    />
                }}
            />
            <DisciplinaTopTab.Screen name="Testes Online" navigation component={TestesOnlineComponent}
                options={{tabBarIcon: () =>
                    <Image
                        style={{width: 25, height: 25}}
                        source={require("../../../assets/png/checkbox-outline.png")}
                    />
                }}
            />
            <DisciplinaTopTab.Screen name="Atividades" navigation initialParams={route.params.params} component={AtividadesComponent}
                                     options={{tabBarIcon: () =>
                                             <Image
                                                 style={{width: 25, height: 25}}
                                                 source={require("../../../assets/png/document-outline.png")}
                                             />
                                     }}/>
            <DisciplinaTopTab.Screen name="Recursos" navigation component={RecursosComponent}
                                     options={{tabBarIcon: () =>
                                             <Image
                                                 style={{width: 25, height: 25}}
                                                 source={require("../../../assets/png/folder-open-outline.png")}
                                             />
                                     }}/>
            {/*<DisciplinaTopTab.Screen name="Mensagens" navigation component={MensagensComponent}
                                     options={{tabBarIcon: () =>
                                             <Image
                                                 style={{width: 25, height: 25}}
                                                 source={require("../../../assets/png/mail-outline.png")}
                                             />
                                     }}/>*/}
            <DisciplinaTopTab.Screen name="Lembretes" navigation component={LembretesDisciplinaComponent}
                                     options={{tabBarIcon: () =>
                                             <Image
                                                 style={{width: 25, height: 25}}
                                                 source={require("../../../assets/png/alarm-outline.png")}
                                             />
                                     }}/>
        </DisciplinaTopTab.Navigator>
    );
}


const HorarioTopTab = createMaterialTopTabNavigator();

function HorarioTopTabNavigation() {
    return (
        <HorarioTopTab.Navigator
            initialLayout={{ width: Dimensions.get('window').width }}
            screenOptions={{
                lazy:true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#811B55',
                tabBarIndicatorStyle: {backgroundColor: '#811B55'},
            }}>

            <HorarioTopTab.Screen name="Agenda" navigation component={HomeScreen}
                                  options={{tabBarIcon: () =>
                                          <Image
                                              style={{width: 25, height: 25}}
                                              source={require("../../../assets/png/clipboard.png")}
                                          />
                                  }}
            />
            <HorarioTopTab.Screen name="Horario Escolar" navigation component={HorarioEscolarScreen}
                                  options={{tabBarIcon: () =>
                                          <Image
                                              style={{width: 25, height: 25}}
                                              source={require("../../../assets/png/calendar-outline.png")}
                                          />
                                  }}/>
        </HorarioTopTab.Navigator>
    );
}

export default AppNavigation;

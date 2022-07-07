import React, {useContext, useEffect, useState} from "react";
import {View, Image, StyleSheet, useWindowDimensions, Keyboard, KeyboardAvoidingView} from "react-native";
import logoipb from "../../../assets/logoipb.png";
import CustomInput from "../../components/CustomInput";
import LoginButton from "../../components/LoginButton";
import { useForm } from "react-hook-form";
import apiLogin from "../../services/api/apiLogin";
import {UserContext} from "../../context/UserContext";
import api from "../../services/api/api";
import {InscricaoContext} from "../../context/InscricaoContext";
import AppLoader from "../../components/AppLoader";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const { height } = useWindowDimensions();
  const {userContext, setUserContext} = useContext(UserContext);
    const {inscricao, setInscricao} = useContext(InscricaoContext);
    const [loginPending, setLoginPending] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')

            if(jsonValue)
            {
                onSignInPressed(JSON.parse(jsonValue));
            }
        } catch(e) {
            // error reading value
        }
    }
    useEffect(() => {
        getData();
    },[])

  const getDisciplinas = (token) => {
    let config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    apiLogin
      .get("/disciplina/create-disciplinas", config)
      .then((response) => {
          api
              .get("/inscricao/get-inscricao/", config)
              .then((response) => {
                  setInscricao(response.data);


              }).then(()=> {setLoginPending(false)
              navigation.replace("HomeScreen", userContext)
          })
              .catch((error) => {
                  setLoginPending(false)
                  console.log(error.response);
              })
      })
      .catch((error) => console.log(`Can't get Disciplinas ${error} `));
  };

  const USERNAME_REGEX = /^[a-zA-Z][0-9]*$/;

  const onSignInPressed = async (data) => {
      Keyboard.dismiss()
      setLoginPending(true)
      console.log(data.username,data.password)
    //console.log(data);
    const pedido = await apiLogin
      .post(`login?username=${data.username}&password=${data.password}`)
      .then((response) => {
        //console.log(response.data);
          console.log(response.data);
        if (response.data === false) {
            setLoginPending(false)

            alert("Numero mecanográfico ou Password incorrectas");
        } else {

          setUserContext(response.data);
          storeData(JSON.stringify(data));
          getDisciplinas(response.data[0].token);

            let config = {
                headers: {
                    Authorization: `Bearer ${response.data[0].token}`,
                },
            };
            api
                .get("/inscricao/get-inscricao/", config)
                .then((response) => {
                    setInscricao(response.data);

                }).then(()=> {setLoginPending(false)
                navigation.replace("HomeScreen", userContext)
            })
                .catch((error) => {
                    setLoginPending(false)
                    console.log(error.response);
                })
        }
      })
      .catch((error) => {
        if(error.response.status === 422) {
           onSignInPressed(data);
        }
        if(error.response.status && error.response.status !== 422)
        {
            setLoginPending(false);
            alert('Erro de Servidor, volte a tentar mais tarde.');
        }
      });
  };

  return (
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} enabled>
      <>
    <View style={styles.container}>
      <Image
        source={logoipb}
        style={[styles.logo, { height: height * 0.3 }]}
        resizeMode="contain"
      />

      <CustomInput
        rules={{
          required: "Insira o número mecanográfico!",
          pattern: {
            value: USERNAME_REGEX,
            message: "É aceite apenas número mecanográfico (Ex: a11111)",
          },
        }}
        placeholder="Número Mecanográfico"
        name="username"
        control={control}
      />
      <CustomInput
        rules={{ required: "Insira a password!" }}
        placeholder="Palavra-Passe"
        name="password"
        control={control}
        secureTextEntry={true}
      />
      <LoginButton text="Login"  onPress={handleSubmit(onSignInPressed)} />
    </View>
          {loginPending ? <AppLoader/> : null}
      </>
      </KeyboardAvoidingView>

  );
};

const styles = StyleSheet.create({
    logo: {
        width: "100%",
        maxWidth: 300,
        maxHeight: 200,
        marginTop:10,
        marginBottom:50,

    },
    container:{
        flex:1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom:70,
        justifyContent: "center",
    },
});
export default LoginScreen;

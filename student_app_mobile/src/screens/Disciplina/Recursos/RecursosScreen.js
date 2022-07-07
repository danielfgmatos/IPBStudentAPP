import React, { createContext, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityComponent,
  Button,
  PermissionsAndroid,
  ScrollView,
  RefreshControl,
} from "react-native";
import api from "../../../services/api/apiLogin";
import Loading from "../../../components/Loading";
import { DisciplinaContext } from "../../../context/DisciplinaContext";
import { UserContext } from "../../../context/UserContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNFetchBlob from "rn-fetch-blob";

const RecursosScreen = ({ route, navigation }) => {
  const { disciplina, setDisciplina } = useContext(DisciplinaContext);
  const [lista, setLista] = useState([]);
  const [actualValue, setActualValue] = useState([]);
  const [actualPath, setActualPath] = useState([]);
  const [actualList, setActualList] = useState([]);
  const [pathValue, setPathValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { userContext } = useContext(UserContext);
  const codigoDisciplina = disciplina.inscricao.codigo_disciplina;


  const requestPermission = async (uri, fileName) => {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "IPB Student App - Transferência de Recursos",
            message:
                "Precisamos da tua autorização para " +
                "transferir recursos.",
            buttonNeutral: "Pergunta-me Depois",
            buttonNegative: "Cancelar",
            buttonPositive: "OK"
          }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await downloadFile(uri,fileName);
      } else {
        console.log("Oops!");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const downloadFile = async (uri, fileName) => {

    const downloads = RNFetchBlob.fs.dirs.DownloadDir;

    try {
      RNFetchBlob
          .config({
            fileCache : true,
            addAndroidDownloads: {
              useDownloadManager : true,
              notification : true,
              mediaScannable : true,
              title: fileName + ' foi transferido com sucesso!',
              description : fileName,
              path : downloads + '/' + fileName,
              overwrite : true,
            }
          })
          .fetch('GET', uri)
          .then((resp) => {
            resp.path();
          })
    } catch (error) {
      console.log('A transferência falhou, tente outra vez.');
    }
  };

  const getRecursos = async (codigo_disciplina) => {
    setActualValue([]);
    setLista([]);
    setActualPath([]);
    setPathValue([]);
    setLoading(true);
    await api
      .get(
        `/recurso/get-recurso/?codigo_disciplina=${codigo_disciplina}&sessionCookie=${userContext[1]}`,
        { headers: { Authorization: `Bearer ${userContext[0].token}` } }
      )
      .then((response) => {
        console.log("Trying to get Recursos");

            setLista(response.data);
            setActualValue(Object.keys(response.data))
        setActualList(response.data);
        setLoading(false);
        setError("");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {


            setError(error.response.status);

        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("ERROR REQUEST :", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error MESSAGE", error.message);
        }
        console.log(error.config);
      }).then(() => {console.log(lista)});
  };
  useEffect(() => {
    /*const unsubscribe = navigation.addListener("blur", () => {
      setActualValue([]);
      setLista([]);
      setActualPath([]);
      setPathValue([]);
      setActualList([]);
    });*/

    getRecursos(codigoDisciplina);



    //return unsubscribe;
  }, [codigoDisciplina]);

  const fallBack = (index) => {
    console.log(actualPath[index]);
    setActualList(actualPath[index]);
    setActualValue(Object.keys(actualPath[index]));
    pathValue.splice(index + 1, pathValue.length);
    actualPath.splice(index + 1, actualPath.length);
  };

  const Path = () =>
    pathValue.map((item, index) => {
      return (
        <TouchableOpacity onPress={() => fallBack(index)}>
          <Text style={{ color: "#811B55", flex: 1 }}> {item}/</Text>
        </TouchableOpacity>
      );
    });

  const renderItem = ({ item, index }) => {
    const backgroundColor =
      item.clicked === false ? "white" : "rgba(129, 27, 85, 0.15)";
    return (
      <Item
        item={item}
        onPress={() => {}}
        backgroundColor={{ backgroundColor }}
      />
    );
  };

  const changeFlatListData = (item) => {
    if (actualList.length !== 0) {
      setActualList(actualList[item]);
      actualPath.push(actualList[item]);
      setActualValue(Object.keys(actualList[item]));
      pathValue.push(item);
    }
  };

  const Item = ({ item, onPress, backgroundColor }) =>
    !loading ? (
      <TouchableOpacity
        onPress={() => {
          if (actualList[item].tipo === "file") {
            requestPermission(actualList[item].linkCompleto, actualList[item].ficheiro);
          } else changeFlatListData(item);
        }}
        style={[styles.item]}
      >
        {actualList[item].tipo === "file" ? (
          <View style={{ flexDirection: "row", flex: 1, padding: 10 }}>
            <Ionicons
              style={styles.icon}
              name="document-outline"
              size={25}
              color="#811B55"
            />
            <Text style={{ fontWeight: "bold", padding: 4 }}>{item}</Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10 }}>
            <Ionicons
              style={styles.icon}
              name="folder-open"
              size={25}
              color="#811B55"
            />
            <Text style={{ fontWeight: "bold", padding: 4 }}>{item}</Text>
          </View>
        )}
      </TouchableOpacity>
    ) : null;

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(129, 27, 85, 0.05)" }}>
      <View style={{ paddingTop: "2%" }}>
        <Text style={[styles.subject]}>{disciplina.inscricao.nome}</Text>
      </View>
      <View style={[styles.tabView]}>
        <Text style={[styles.tabText]}>Recursos</Text>
      </View>

      {loading ? (
        <Loading />
      ) : (
        <>

          <View
            style={{
              flexDirection: "row",
              padding: 10,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setActualList(lista);
                setActualValue(Object.keys(lista));
                setActualPath([]);
                setPathValue([]);
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Recursos /</Text>
            </TouchableOpacity>
            <Path />
          </View>
          { error === 500 ?   <TouchableOpacity onPress={()=> getRecursos(codigoDisciplina)} style={styles.carregarRecursos}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.buttonText}>Erro a carregar recursos </Text>
              <Ionicons
                  style={styles.icon}
                  name="refresh-outline"
                  size={20}
                  color="white"
              />
            </View>
          </TouchableOpacity> : null }
          {lista.length === 0 ? (
              <Text
                  style={{
                    paddingTop: "50%",
                    textAlign: "center",
                    color: "#811B55",
                    fontSize: 25,
                  }}
              >
                Sem Recursos
              </Text>
          ) : null}
          <FlatList
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            data={actualValue}
            extraData={actualValue}
            refreshing={false}
            onRefresh={() => getRecursos(codigoDisciplina)}
          />



        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundView: {
    paddingTop: "2%",
    flex: 1,
    backgroundColor: "rgba(129, 27, 85, 0.05)",
  },
  item: {
    marginTop: "2%",
    marginHorizontal: "1%",
    flex: 1,
    borderStyle: "solid",
    marginRight: "10%",
  },
  testesOnlineHeader: {
    alignSelf: "center",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    justifyContent: "space-evenly",
  },
  testesOnlineHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  testesOnlineFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#811B55",
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    padding: "2%",
  },
  labelAuthor: {
    fontStyle: "italic",
    color: "#811B55",
  },
  testesOnlineFooterTextLeft: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    fontStyle: "italic",
  },
  testesOnlineFooterTextRight: {
    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#A81313",
  },
  carregarRecursos: {
    alignItems: "center",
    shadowRadius: 10,
    shadowColor: "#811B55",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    backgroundColor: "#811B55",
  },
  buttonText: {
    color: "white"
  },
  subject: {
    fontSize: 18,
    color: "#811B55",
    fontWeight: "bold",
    alignSelf: "center",
  },
  tabView: {
    marginTop: "2%",
    paddingVertical: "0.6%",
    backgroundColor: "#811B55",
  },
  tabText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
});

export default RecursosScreen;

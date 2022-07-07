import React, {createContext, useContext, useEffect, useState} from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityComponent,
  Button, ScrollView, RefreshControl,
} from "react-native";
import updateProps from "react-native-reanimated/src/reanimated2/UpdateProps";
import api from "../../../services/api/apiLogin";
import Loading from "../../../components/Loading";
import ModalAvisoInfo from "./AvisosComponents/ModalAvisoInfo";
import {InscricaoContext} from "../../../context/InscricaoContext";
import {DisciplinaContext} from "../../../context/DisciplinaContext";

const AvisosScreen = ({ route }) => {
  const {disciplina, setDisciplina} = useContext(DisciplinaContext);
  const userContext = route.params.userContext;
  const codigoDisciplina = route.params.inscricao.codigo_disciplina;
  const nomeDisciplina = route.params.inscricao.nome;
  const [lista, setLista] = useState([]);
  const [increment, setIncrement] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState();


  const fetchAvisos =  (codigo_disciplina) => {
    setLoading(true)
    setDisciplina(route.params);

   api
      .get(
          `/aviso/fetch-aviso/?codigo_disciplina=${codigo_disciplina}`,
          { headers: { Authorization: `Bearer ${userContext[0].token}` } }
      ).then((response) => {

        console.log("GET AVISO");
        setLista(response.data);
        setLoading(false);
        if(response.data.length === 0) {

        getAvisos(codigo_disciplina);
        }
      })

  }


  const getAvisos =  (codigo_disciplina) => {
    setLoading(true);
    api
      .get(
        `/aviso/get-aviso/?codigo_disciplina=${codigo_disciplina}&sessionCookie=${userContext[1]}`,
        { headers: { Authorization: `Bearer ${userContext[0].token}` } }
      )
      .then((response) => {
        console.log("Trying to get Avisos");
        setLista(response.data);
        setLoading(false);

      })

      .catch((error) => console.log(`Impossível criar Avisos ${error} `));
  };

  useEffect(() => {
    fetchAvisos(codigoDisciplina);
  }, [codigoDisciplina, increment]);

  const renderModal = (item) => {
    setModalOpen(true);
    setModalItem(item);

  }

  const renderItem = ({ item, index }) => {


    return (
      <Item
        item={item}
        onPress={()=> {}}

      />
    );
  };
  //console.log(lista);

  //backgroundColor={{backgroundColor: item.clicked === false ? "rgba(129, 27, 85, 0.15)" : "white"}}

  const Item = ({ item, onPress}) => (

    <TouchableOpacity
      onPress={() => {renderModal(item)}}
      style={[styles.item, { backgroundColor:  "rgba(129, 27, 85, 0.15)"}]}
    >
      <View style={[styles.avisoHeader]}>
        <Text style={[styles.avisoHeaderText]}>{item.assunto}</Text>
      </View>
      <View style={[styles.avisoFooter]}>
        <Text style={[styles.avisoFooterTextLeft]}>
          <Text style={[styles.labelAuthor]}>Autor :</Text> {item.autor}
        </Text>
        <Text style={[styles.avisoFooterTextRight]}>
          {item.data_modificado}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (

    <View style={[styles.backgroundView]}>
      <View>
        <Text style={[styles.subject]}>{nomeDisciplina}</Text>
      </View>
      <View style={[styles.tabView]}>
        <Text style={[styles.tabText]}>Avisos</Text>
      </View>
      {lista.length === 0 ?
      <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
                refreshing={false}
                onRefresh={()=> getAvisos(codigoDisciplina)}
            /> }>
        <Text style={{paddingTop: '50%', textAlign: "center", color: "#811B55", fontSize: 25}}>Sem avisos</Text>
      </ScrollView> : null}


      {modalOpen ? <ModalAvisoInfo setModalOpen={setModalOpen} values={modalItem} userContext={userContext} setIncrement={setIncrement} increment={increment} /> : null}
      {loading ? <Loading/> :
      <FlatList
        data={lista.sort((a,b)=>a.id_aviso - b.id_aviso)}
        renderItem={(item)=> renderItem(item)}
        keyExtractor={(item) => item.id_aviso}
        extraData={lista}
        refreshing={false}
        onRefresh={() => {  getAvisos(codigoDisciplina)}}
      />
      }
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
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#811B55",

  },
  avisoHeader: {
    flex: 1,
    alignSelf: "center",
    paddingVertical: "5%",
    paddingHorizontal: "5%",
    justifyContent: "space-evenly",
  },
  avisoHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
  },
  avisoFooter: {
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
  avisoFooterTextLeft: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    fontStyle: "italic",
  },
  avisoFooterTextRight: {

    fontSize: 12,
    fontWeight: "bold",
    fontStyle: "italic",
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

export default AvisosScreen;

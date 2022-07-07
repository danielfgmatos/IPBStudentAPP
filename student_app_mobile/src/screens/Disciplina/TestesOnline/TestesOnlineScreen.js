import React, {useState, useEffect, useContext} from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityComponent,
    ScrollView,
    RefreshControl
} from "react-native";
import {DisciplinaContext} from "../../../context/DisciplinaContext";
import {UserContext} from "../../../context/UserContext";
import api from "../../../services/api/apiLogin";
import Loading from "../../../components/Loading";
import Ionicons from "@expo/vector-icons/Ionicons";

const TestesOnlineSreen = () => {
    const {disciplina, setDisciplina} = useContext(DisciplinaContext);
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState();
    const {userContext} = useContext(UserContext);
    const codigoDisciplina = disciplina.inscricao.codigo_disciplina;
    const numero_mecanografico = disciplina.inscricao.numero_mecanografico;
    const [error, setError ] = useState();


    const getTestes =  (codigo_disciplina) => {
        setLoading(true)



         api
            .get(
                `/teste/fetch-teste/?codigo_disciplina=${codigo_disciplina}`,
                {headers: {Authorization: `Bearer ${userContext[0].token}`}}
            ).then((response) => {

                console.log("GET TESTE");
                setLista(response.data);
                setLoading(false);
                if (response.data.length === 0) {

                    createTestes(codigo_disciplina);
                }
                setError("");
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
         })
    }

        const createTestes =  (codigo_disciplina) => {
            setLoading(true);


            api
                .get(
                    `/teste/get-teste/?codigo_disciplina=${codigo_disciplina}&sessionCookie=${userContext[1]}`,
                    { headers: { Authorization: `Bearer ${userContext[0].token}` } }
                )
                .then((response) => {
                    console.log("Trying to create testes");
                    setLista(response.data);
                    setLoading(false);
                    setError("");
                })

                .catch((error) => {
                    setLoading(false);
                    if (error.response) {
                        setError(error.response.status);
                        // The request was made and the server responded with a status code
                        // that falls out of the range of 2xx
                        console.log(' TESTE - Mensagem de Erro',error.response.data);
                        console.log(' TESTE - Codigo Network de Erro:',error.response.status);
                        console.log(' TESTE - Headers:',error.response.headers);


                            //createTestes(codigoDisciplina);

                    } else if (error.request) {
                        // The request was made but no response was received
                        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                        // http.ClientRequest in node.js
                        console.log(error.request);



                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        };


    useEffect(() => {
    getTestes(codigoDisciplina)
    }, [codigoDisciplina]);


    const renderItem = ({ item, index }) => {
        const backgroundColor =
            item.clicked === false ? "white" : "rgba(129, 27, 85, 0.15)";
        return (
            <Item
                item={item}
                onPress={() => { console.log(item);
                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    const Item = ({item, onPress, backgroundColor}) => (
        <TouchableOpacity onPress={()=> {console.log(item)}} style={[styles.item, backgroundColor]}>
            <View style={[styles.testesOnlineHeader]}>
                <Text style={[styles.testesOnlineHeaderText]}>
                    {item.titulo}
                </Text>
            </View>
            <View style={[styles.testesOnlineFooter]}>
                <Text style={[styles.testesOnlineFooterTextLeft]}>
                    <Text style={[styles.labelAuthor]}>Submetida: </Text>
                    {item.data_submetido}
                </Text>
                <Text style={[styles.testesOnlineFooterTextRight]}>
                    <Text>Pontuação: </Text>
                    {item.nota}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.backgroundView]}>
            <View>
                <Text style={[styles.subject]}>{disciplina.inscricao.nome}</Text>
            </View>
            <View style={[styles.tabView]}>
                <Text style={[styles.tabText]}>Testes Online</Text>
            </View>

            { error === 500 ?   <TouchableOpacity onPress={()=> createTestes(codigoDisciplina)} style={styles.carregarTestes}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.buttonText}>Erro a carregar Testes </Text>
                    <Ionicons
                        style={styles.icon}
                        name="refresh-outline"
                        size={20}
                        color="white"
                    />
                </View>
            </TouchableOpacity> : null }
            {lista.length === 0 ?   <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=> createTestes(codigoDisciplina)}
                    /> }>
             <Text style={{ paddingTop: '50%', textAlign: "center", color: "#811B55", fontSize: 25}}>Sem Testes</Text>
                    </ScrollView> : null}


            {loading ? <Loading/> :

            <FlatList
                data={lista.sort((a,b)=>a.id_teste - b.id_teste)}
                renderItem={renderItem}
                keyExtractor={(item,index) => index.toString()}
                extraData={lista}
                refreshing={false}
                onRefresh={()=> {createTestes(codigoDisciplina)}}
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
        backgroundColor: "rgba(129, 27, 85, 0.15)",
        borderColor: "#811B55",
    },
    testesOnlineHeader: {
        alignSelf: "center",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        justifyContent: "space-evenly"
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
    carregarTestes: {

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
        backgroundColor: "#811B55"
    },
    tabText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
    }
})

export default TestesOnlineSreen;
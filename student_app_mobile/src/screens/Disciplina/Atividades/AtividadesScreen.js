import React, {useState, useEffect, useContext} from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    TouchableOpacityComponent, ScrollView, RefreshControl
} from "react-native";
import {InscricaoContext} from "../../../context/InscricaoContext";
import {DisciplinaContext} from "../../../context/DisciplinaContext";
import api from "../../../services/api/apiLogin";
import {UserContext} from "../../../context/UserContext";
import {format, parseISO} from "date-fns";
import ModalAvisoInfo from "../Avisos/AvisosComponents/ModalAvisoInfo";
import ModalAtividadesInfo from "./AtividadesComponent/ModalAtividadesInfo";
import Loading from "../../../components/Loading";

const AtividadesScreen = () => {
    const {disciplina, setDisciplina} = useContext(DisciplinaContext);
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState();
    const {userContext} = useContext(UserContext);
    const codigoDisciplina = disciplina.inscricao.codigo_disciplina;

    const getTrabalhos =  (codigo_disciplina) => {
        setLoading(true)


        api
            .get(
                `/trabalho/get-trabalhos/?codigo_disciplina=${codigo_disciplina}`,
                { headers: { Authorization: `Bearer ${userContext[0].token}` } }
            ).then((response) => {

                console.log("GET Trabalho");
                setLista(response.data);
                setLoading(false);
                if(response.data.length === 0) {

                    createTrabalhos(codigo_disciplina);
                }
            })

    }

    const createTrabalhos =  (codigo_disciplina) => {
        setLoading(true);
       api
            .get(
                `/trabalho/create-trabalhos/?codigo_disciplina=${codigo_disciplina}&sessionCookie=${userContext[1]}`,
                { headers: { Authorization: `Bearer ${userContext[0].token}` } }
            )
            .then((response) => {
                console.log("Trying to get trabalhos");
                setLista(response.data);
                setLoading(false);

            })

            .catch((error) => console.log(`Impossível criar trabalhos ${error} `));
    };



    useEffect(() => {
        getTrabalhos(codigoDisciplina)
    }, [codigoDisciplina]);

    const renderModal = (item) => {
        setModalOpen(true);
        setModalItem(item);

    }


    const renderItem = ({ item, index }) => {
        const backgroundColor =
            item.clicked === false ? "white" : "rgba(129, 27, 85, 0.15)";
        return (
            <Item
                item={item}
                onPress={() => {

                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };

    const Item = ({item, onPress, backgroundColor}) => (
        <TouchableOpacity  onPress={() => {renderModal(item)}} style={[styles.item, backgroundColor]}>
            <View style={[styles.testesOnlineHeader]}>
                <Text style={[styles.testesOnlineHeaderText]}>
                    {item.titulo}
                </Text>
            </View>
            <View style={[styles.testesOnlineFooter]}>
                <Text style={[styles.testesOnlineFooterTextLeft]}>
                    <Text style={[styles.labelAuthor]}>Aberto em: </Text>
                    {item.data_inicio}
                </Text>
                <Text style={[styles.testesOnlineFooterTextRight]}>
                    {item.data_vencimento}
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
                <Text style={[styles.tabText]}>Atividades</Text>

            </View>
            {lista.length === 0 ?
            <ScrollView
                contentContainerStyle={styles.scrollView}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={()=> createTrabalhos(codigoDisciplina)}
                    /> }>
                <Text style={{paddingTop: '50%', textAlign: "center", color: "#811B55", fontSize: 25}}>Sem atividades</Text>
            </ScrollView> : null}

            {modalOpen ? <ModalAtividadesInfo setModalOpen={setModalOpen} values={modalItem} /> : null}
           {loading ? <Loading/> :
            <FlatList
                data={lista.sort((a,b)=>a.id_trabalho - b.id_trabalho)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id_trabalho}
                extraData={lista}
                refreshing={false}
               onRefresh={()=> {createTrabalhos(codigoDisciplina)}}
            /> }


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

export default AtividadesScreen;
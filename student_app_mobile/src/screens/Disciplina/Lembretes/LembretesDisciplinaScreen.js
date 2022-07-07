import React, {useContext, useEffect, useState} from "react";
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from "react-native";
import {DisciplinaContext} from "../../../context/DisciplinaContext";
import {UserContext} from "../../../context/UserContext";
import api from "../../../services/api/apiLogin";
import ModalAvisoInfo from "../Avisos/AvisosComponents/ModalAvisoInfo";
import Loading from "../../../components/Loading";
import ModalLembreteInfo from "./LembretesComponent/ModalLembreteInfo";

const LembretesDisciplinaScreen = () => {
    const {disciplina, setDisciplina} = useContext(DisciplinaContext);
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(false);
    const [update, setUpdate] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalItem, setModalItem] = useState();
    const {userContext} = useContext(UserContext);
    const codigoDisciplina = disciplina.inscricao.codigo_disciplina;


    const renderTipo = (data) => {
        if (data === '1') {
            return <Text style={styles.tituloModal}>Aviso</Text>
        }

        if (data === '2') {
            return <Text style={styles.tituloModal}>Lembrete</Text>
        }
        if (data === '3') {
            return <Text style={styles.tituloModal}>Teste</Text>
        }

        if (data === '4') {
            return <Text style={styles.tituloModal}>Atividade</Text>
        }
    }


    const getLembretes =  (codigo_disciplina) => {
        setLoading(true)


         api
            .get(
                `/lembrete/get-lembrete-disciplina/?codigo_disciplina=${codigo_disciplina}`,
                { headers: { Authorization: `Bearer ${userContext[0].token}` } }
            ).then((response) => {

                console.log("GET LEMBRETES BY DISCIPLINA");
                setLista(response.data);
                setLoading(false);
            })

    }
    useEffect(() => {
        getLembretes(codigoDisciplina)
    }, [codigoDisciplina, update]);

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

    const renderModal = (item) => {
        setModalOpen(true);
        setModalItem(item);

    };
    const Item = ({item, onPress, backgroundColor}) => (
        <TouchableOpacity  onPress={() => {renderModal(item)}} style={[styles.item, backgroundColor]}>
            <View style={[styles.testesOnlineHeader]}>
                <Text style={[styles.testesOnlineHeaderText]}>
                    {item.descricao}
                </Text>
                <Text style={[styles.testesOnlineHeaderText2]}>
                    {renderTipo(item.tipo)}
                </Text>
            </View>
            <View style={[styles.testesOnlineFooter]}>
                <Text style={[styles.testesOnlineFooterTextLeft]}>
                    <Text style={[styles.labelAuthor]}>Criado em: </Text>
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
                <Text style={[styles.tabText]}>Lembretes</Text>
            </View>
            {lista.length === 0 ? <Text style={{paddingTop: '50%', textAlign: "center", color: "#811B55", fontSize: 25}}>Sem Lembretes</Text> : null}

            {modalOpen ? <ModalLembreteInfo setModalOpen={setModalOpen} values={modalItem}  setModalItem={setModalItem} setUpdate={setUpdate} /> : null}
            {loading ? <Loading/> :
                <FlatList
                    data={lista}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id_lembrete}
                    extraData={lista}
                    refreshing={false}
                    onRefresh={() => {  getLembretes(codigoDisciplina)}}
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

    testesOnlineHeaderText2: {
        fontSize: 12,
        paddingTop: 10,
        fontWeight: "bold",
        textAlign: "center",
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

export default LembretesDisciplinaScreen;
import React, {useState , useEffect} from "react";
import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    Image,
} from "react-native";

const MensagensScreen = () => {

    const [listaReceived, setListaReceived] = useState([
            {
                id: 1,
                subject: "Assunto da Mensagem 1",
                author: "Autor da mensagem",
                date: "21/11/2022  20:23",
                clicked: false,
            },
            {
                id: 2,
                subject: "Assunto da Mensagem 2",
                author: "Autor da mensagem",
                date: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 3,
                subject: "Assunto da Mensagem 3",
                author: "Autor da mensagem",
                date: "13/11/2022  22:33",
                clicked: false,
            },
            {
                id: 4,
                subject: "Assunto da Mensagem 4",
                author: "Autor da mensagem",
                date: "11/11/2022  13:23",
                clicked: false,
            },
            {
                id: 5,
                subject: "Assunto da Mensagem 5",
                author: "Autor da mensagem",
                date: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 6,
                subject: "Assunto da Mensagem 6",
                author: "Autor da mensagem",
                date: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 7,
                subject: "Assunto da Mensagem 7",
                author: "Autor da mensagem",
                date: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 8,
                subject: "Assunto da Mensagem 8",
                author: "Autor da mensagem",
                date: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 9,
                subject: "Assunto da Mensagem 9",
                author: "Autor da mensagem",
                date: "15/11/2022  11:03",
                clicked: false,
            }
        ]
    );

    const [listaSent, setListaSent] = useState([
            {
                id: 1,
                title: "Aviso sobre algo relacionado com a Disciplina 1",
                author: "Autor 1",
                dataAviso: "21/11/2022  20:23",
                clicked: false,
            },
            {
                id: 2,
                title: "Aviso sobre algo relacionado com a Disciplina 2",
                author: "Autor 2",
                dataAviso: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 3,
                title: "Aviso sobre algo relacionado com a Disciplina 3",
                author: "Autor 3",
                dataAviso: "13/11/2022  22:33",
                clicked: false,
            },
            {
                id: 4,
                title: "Aviso sobre algo relacionado com a Disciplina 4",
                author: "Autor 4",
                dataAviso: "11/11/2022  13:23",
                clicked: false,
            },
            {
                id: 5,
                title: "Aviso sobre algo relacionado com a Disciplina 5",
                author: "Autor 5",
                dataAviso: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 6,
                title: "Aviso sobre algo relacionado com a Disciplina 6",
                author: "Autor 5",
                dataAviso: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 7,
                title: "Aviso sobre algo relacionado com a Disciplina 7",
                author: "Autor 5",
                dataAviso: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 8,
                title: "Aviso sobre algo relacionado com a Disciplina 8",
                author: "Autor 5",
                dataAviso: "15/11/2022  11:03",
                clicked: false,
            },
            {
                id: 9,
                title: "Aviso sobre algo relacionado com a Disciplina 9",
                author: "Autor 5",
                dataAviso: "15/11/2022  11:03",
                clicked: false,
            }
        ]
    );


    const clicado = (item) => {
        let newArray = listaReceived;
        newArray[item] = { ...newArray[item], clicked: true };

        setListaReceived(newArray);

        console.log(lista);
    };

    useEffect(() => {}, [listaReceived]);

    const [selectedId, setSelectedId] = useState(null);
    const renderItem = ({ item, index }) => {
        const backgroundColor =
            item.clicked === false ? "white" : "rgba(129, 27, 85, 0.15)";
        return (
            <Item
                item={item}
                onPress={() => {
                    clicado(index);
                }}
                backgroundColor={{ backgroundColor }}
            />
        );
    };
    /*const clicado = () => {
        setClicked(
            clicked.map((item) => item.id === item.id ? { ...clicked, clicked: true}
                : {...clicked}
            )
        );
    }*/
    //backgroundColor={{backgroundColor: item.clicked === false ? "rgba(129, 27, 85, 0.15)" : "white"}}

    const Item = ({item, onPress, backgroundColor}) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View style={[styles.avisoHeader]}>
                <Text style={[styles.avisoHeaderText]}>
                    {item.subject}
                </Text>
            </View>
            <View style={[styles.avisoFooter]}>
                <Text style={[styles.avisoFooterTextLeft]}>
                    <Text style={[styles.labelAuthor]}>Autor: </Text>
                    {item.author}
                </Text>
                <Text style={[styles.avisoFooterTextRight]}>
                    {item.date}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={[styles.backgroundView]}>
            <View>
                <Text style={[styles.subject]}>Disciplina 1</Text>
            </View>
            <View style={[styles.tabView]}>
                <Text style={[styles.tabText]}>Mensagens</Text>
            </View>
            <View style={[styles.tabFilterView]}>
                <TouchableOpacity style={[styles.tabFilterButtons]}>
                    <Text>Recebidas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.tabFilterButtons]}>
                    <Text>Enviadas</Text>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity>
                        <Image
                            style={{width: 25, height: 25}}
                            source={require("../../../../assets/png/add-circle-sharp.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <FlatList
                data={listaReceived}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                extraData={listaReceived}
            />
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
    avisoHeader: {
        alignSelf: "center",
        paddingVertical: "5%",
        paddingHorizontal: "5%",
        justifyContent: "space-evenly"
    },
    avisoHeaderText: {
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
        backgroundColor: "#811B55"
    },
    tabText: {
        fontSize: 16,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
    },
    tabFilterView:{
        marginTop: "2%",
        paddingVertical: "0.6%",
        flexDirection: "row",
        alignSelf: "center",
    },
    tabFilterButtons:{
      borderRadius: 5,
      borderColor: "#811B55",
      borderWidth: 2,
    },
    tabNewButton:{

    },
})

export default MensagensScreen;
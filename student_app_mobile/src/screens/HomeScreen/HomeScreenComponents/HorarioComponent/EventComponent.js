import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native';


const  EventComponent = ({event, position, personalizar}) => {

    return (

<>
    <View style={styles.eventStyle}>
                <Text style={styles.eventText}>
                    {event.description}
                </Text>
    <Text style={styles.eventText}>
        {event.sala}
    </Text>
        </View>
</>



    )





}

export default EventComponent;


const styles = StyleSheet.create({
eventText:{
    flex: 1,
    paddingTop: 3,
    color: "white",
    textAlign: "center",
},
eventStyle:{
    borderRadius: 2,
    flex: 1,
    shadowColor: "white",
    shadowOffset: {
        width: 0,
        height: 0,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.22,

    elevation: 2,
}
})
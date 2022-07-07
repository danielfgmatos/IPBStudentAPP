import React from 'react';
import {View, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";


const Loading = () => {
    return (
        <View style ={[StyleSheet.absoluteFillObject, styles.container]}>
            <LottieView source={require('../../assets/loadingData.json')} autoPlay loop/>
        </View>
    )


}


export default Loading;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 1,
    }

});
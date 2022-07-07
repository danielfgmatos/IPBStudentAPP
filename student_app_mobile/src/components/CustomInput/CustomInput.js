import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {Controller} from "react-hook-form";
import FeatherIcons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import {format, parseISO} from "date-fns";

const CustomInput = ({control, name, placeholder, secureTextEntry, icon=false, rules={}}) => {
    const [dateTimePickerVisible, setDateTimePickerVisible] = useState(false);




    return (



            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { value, onChange, onBlur }, fieldState:{error} }) => (
                    <>


                            <View style={[styles.container , {borderColor: error ? 'red' : '#e8e8e8'}]}>
                                <TextInput
                                    value={value}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    style={styles.input}
                                    placeholder={placeholder}
                                    secureTextEntry = {secureTextEntry}


                                />
                            </View>


                        {error && (  <Text style={{color:'red', alignSelf:'stretch'}}>{error.message || 'Error'}</Text> )}
                    </>
                )}
            />


    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
      backgroundColor: 'white',
        width: '100%',
        height:40,
        borderColor:'#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },

    input: {
flex: 1,
    },
});
export default CustomInput;

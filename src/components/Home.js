import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Home extends React.Component {
    constructor() {
        super();
    }

    pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        // this.navigation.navigate('Login');

    }

    componentDidMount() {

    }
    comp

    styles = StyleSheet.create({
        loginBtn: {
            width: "80%",
            borderRadius: 25,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 40,
            backgroundColor: "#6f42c1af",
        },
    });
    render (){
        return (
            <View style={globalStyles.container}>
                <Text style={globalStyles.titleText}>Home Screen</Text>
                <Button title='clear token' onPress={()=> {
                    AsyncStorage.removeItem('auth-token')
                }} />

                <Button  title='navigate to Login screen' onPress={async ()=> {
                    let token = await AsyncStorage.getItem('auth-token')
                    if (token != null) {
                        alert('u re not able to navigate to login page')
                    }
                    else {
                        this.props.navigation.navigate('Login')
                    }
                    // alert('ssqdqsds')
                }} />
            </View>
        )
    }
}

export default function(props) {
    const navigation = useNavigation();

    return <Home {...props} navigation={navigation} />;
}
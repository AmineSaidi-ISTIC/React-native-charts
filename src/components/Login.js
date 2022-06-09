import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {useNavigation} from "@react-navigation/native";
import JWT from 'expo-jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {VictoryChart, VictoryBar, VictoryTheme, VictoryStack, VictoryAxis, VictoryLegend, VictoryLabel, VictoryPie,VictoryAnimation} from 'victory-native'

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            percent: 25, data: this.getData(0)
        };
    }

    email = ''
    password = ''

    setEmail = (val) => {
        this.email = val
    }

    setPassword = (val) => {
        this.password = val
    }

    login = async () => {
        try {
            let token = await AsyncStorage.getItem('auth-token')
            if (token == null) {
                alert(this.email)
                const tokenizedData = JWT.encode({ email:this.email }, 'key', { exp : new Date().getTime() + 60 * 1000})

                alert(tokenizedData)
                await AsyncStorage.setItem('auth-token',tokenizedData)
                await this.props.navigation.navigate('Home')
            }
        } catch (e) {
            alert(e)
        }

    }

    navigateToHomeScreen = async () => {
        let token = await AsyncStorage.getItem('auth-token')
        if (token == null) {
            alert('u re not authorized')
        }
        else {
            await this.props.navigation.navigate('Home')
        }

    }

    checkToken = async (token) => {
        try {
            const data = JWT.decode(token, 'key');
            alert(data.exp)
        } catch (e) {
            alert(e)
        }
    }

    // async componentDidMount() {
    //     // alert('did mount')
    //     // const token = await AsyncStorage.getItem('auth-token')
    //     // if (token != null) {
    //     //
    //     //     this.props.navigation.navigate('Home')
    //     // }
    //     // await this.checkToken(token)
    // }


    componentDidMount() {
        let percent = 25;
        this.setStateInterval = window.setInterval(() => {
            percent += (Math.random() * 25);
            percent = (percent > 100) ? 0 : percent;
            this.setState({
                percent, data: this.getData(percent)
            });
        }, 2000);
    }

    styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
        },

        image: {
            marginBottom: 40,
        },

        inputView: {
            backgroundColor: "#6610f28f",
            borderRadius: 30,
            width: "70%",
            height: 45,
            marginBottom: 20,

            alignItems: "center",
        },

        TextInput: {
            height: 50,
            flex: 1,
            padding: 10,
            marginLeft: 20,
        },

        forgot_button: {
            height: 30,
            marginBottom: 30,
        },

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

    pressHandler = () => {
        //navigation.navigate('ReviewDetails');
        // this.navigation.navigate('Login');
    }

    blueBarChartData = [
        { x: "Monday", y: 34 },
        { x: "Thursday", y: 34 },
        { x: "Friday", y: 17 },
        { x: "Saturdays", y: 17 }
    ];

    // theme = {
    //     bar: assign(
    //         {
    //             style: {
    //                 data: {
    //                     fill: blueGrey700,
    //                     padding,
    //                     strokeWidth: 0
    //                 },
    //                 labels: baseLabelStyles
    //             }
    //         },
    //         baseProps
    //     ),
    // }
    getData(percent) {
        return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
    }

    render (){
        return (
            <View style={this.styles.container}>
                <ScrollView>
                    <View>
                        <VictoryChart
                            height={500}
                            width={500}
                            domainPadding={{ x: 50 }}
                        >
                            <VictoryAxis
                                style={{axisLabel: {padding: 35 } }}
                                label="Days"
                            />
                            <VictoryAxis
                                dependentAxis
                                label="Days Count Per Month"
                                style={{
                                    axisLabel: {padding: 35 },
                                    grid: { stroke: '#d2d2d2', strokeWidth: 0.7 },
                                }}
                            />
                            <VictoryBar
                                theme={VictoryTheme.material}
                                barRatio={1.1}
                                alignment="middle"
                                style={{
                                    data: { fill: "#458bdb" }
                                }}
                                data={this.blueBarChartData}

                            />
                        </VictoryChart>
                    </View>

                    <View style={ { marginTop: 50}}>
                        <VictoryChart
                            height={300}
                            width={500}
                            domainPadding={{ x: 50 }}
                        >
                            <VictoryLegend x={100} y={0}
                                           orientation="horizontal"
                                           gutter={20}
                                           style={{ border: { stroke: "black" }, padding: 50 }}
                                           data={[
                                               { name: "Phone - ID", symbol: { fill: "#e16452", type: "square" } },
                                               { name: "Laptop - ID", symbol: { fill: "#e7ad4c" ,type: "square" } },
                                               { name: "Tablet - ID", symbol: { fill: "#6dabe5", type: "square" } }
                                           ]}
                            />
                            <VictoryAxis
                                style={{axisLabel: {padding: 35 } }}
                                label="Requests by asset type"
                            />
                            <VictoryAxis
                                dependentAxis

                                style={{
                                    axisLabel: {padding: 35 },
                                    grid: { stroke: '#d2d2d2', strokeWidth: 0.7 },
                                }}
                            />
                            <VictoryStack
                                colorScale={["#e16452", "#e7ad4c", "#6dabe5"]}

                            >

                                <VictoryBar
                                    barRatio={0.9}
                                    data={[{x: "Customer Support", y: 1}, {x: "HR", y: 1}, {x: "Marketing", y: 1},{x: "Partner Relations", y: 1},{x: "Sales", y: 1}]}
                                />
                                {/*<VictoryAxis tickLabelComponent={<VictoryLabel angle={-45} y={350} />} />*/}
                                <VictoryBar
                                    barRatio={0.9}
                                    data={[{x: "Customer Support", y: 0}, {x: "HR", y: 1}, {x: "Marketing", y: 1},{x: "Partner Relations", y: 1},{x: "Sales", y: 1}]}
                                />
                                <VictoryBar
                                    barRatio={0.9}
                                    data={[{x: "Customer Support", y: 0}, {x: "HR", y: 0}, {x: "Marketing", y: 0},{x: "Partner Relations", y: 0},{x: "Sales", y: 1}]}
                                />

                            </VictoryStack>
                        </VictoryChart>
                    </View>

                    <View>
                        <VictoryChart
                            height={350}
                            width={350}
                            style={{
                                parent: {
                                    border: "0px solid #fff"
                                },


                            }}
                        >
                            <VictoryAxis
                                style={{
                                    axis: {stroke: "transparent"},
                                    ticks: {stroke: "transparent"},
                                    tickLabels: { fill:"transparent"}
                                }}
                            />
                            <VictoryAxis
                                style={{
                                    axis: {stroke: "transparent"},
                                    ticks: {stroke: "transparent"},
                                    tickLabels: { fill:"transparent"}
                                }}

                            />
                            <VictoryPie
                                standalone={false}
                                width={250} height={250}
                                data={[{ x: 1, y: 100 }]}
                                innerRadius={100}
                                cornerRadius={25}
                                labels={() => null}
                                style={{
                                    data: { fill: ({ datum }) => {
                                            const color =  "#e9edf2";
                                            return datum.x === 1 ? color : "transparent";
                                        }
                                    }
                                }}
                            />
                            <VictoryPie
                                standalone={false}
                                width={250} height={250}
                                data={[{ x: 2, y: 60 }, { x: 1, y: 90 }]}
                                innerRadius={100}
                                cornerRadius={25}
                                labels={() => null}
                                style={{
                                    data: { fill: ({ datum }) => {
                                            const color = "#59b391";
                                            return datum.x === 1 ? color : "transparent";
                                        }
                                    }
                                }}
                            />
                            <VictoryPie
                                standalone={false}
                                width={100} height={100}
                                data={[{ x: 1, y: 100 }]}
                                innerRadius={55}
                                radius={80}
                                cornerRadius={55}
                                labels={() => null}
                                style={{
                                    data: { fill: ({ datum }) => {
                                            const color = "#e9edf2";
                                            return datum.x === 1 ? color : "transparent";
                                        }
                                    }
                                }}
                            />
                            <VictoryPie
                                standalone={false}
                                width={100} height={100}
                                data={[{ x: 2, y: 60 }, { x: 1, y: 90 }]}
                                innerRadius={55}
                                radius={80}
                                cornerRadius={55}
                                labels={() => null}
                                style={{
                                    data: { fill: ({ datum }) => {
                                            const color = "#5572dd";
                                            return datum.x === 1 ? color : "transparent";
                                        }
                                    }
                                }}
                            />
                            <VictoryLegend x={160} y={0}
                                           orientation="horizontal"
                                           gutter={20}
                                           style={{ border: { stroke: "black" }, padding: 50 }}
                                           data={[
                                               { name: "Phone - ID", symbol: { fill: "#e16452", type: "square" } },
                                               { name: "Laptop - ID", symbol: { fill: "#e7ad4c" ,type: "square" } },
                                               { name: "Tablet - ID", symbol: { fill: "#6dabe5", type: "square" } }
                                           ]}
                            />

                        </VictoryChart>
                    </View>



                {/*    ------------------------------------------------------------------  */}
                {/*    <View>*/}
                {/*        <VictoryChart*/}
                {/*            height={500}*/}
                {/*            width={500}*/}
                {/*        >*/}
                {/*            <VictoryPie*/}
                {/*                standalone={false}*/}
                {/*                width={400} height={400}*/}
                {/*                data={[{ x: 1, y: 100 }]}*/}
                {/*                innerRadius={150}*/}
                {/*                cornerRadius={25}*/}
                {/*                labels={() => null}*/}
                {/*                style={{*/}
                {/*                    data: { fill: ({ datum }) => {*/}
                {/*                            const color =  "#e9edf2";*/}
                {/*                            return datum.x === 1 ? color : "transparent";*/}
                {/*                        }*/}
                {/*                    }*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <VictoryPie*/}
                {/*                standalone={false}*/}
                {/*                width={400} height={400}*/}
                {/*                data={[{ x: 2, y: 60 }, { x: 1, y: 90 }]}*/}
                {/*                innerRadius={150}*/}
                {/*                cornerRadius={25}*/}
                {/*                labels={() => null}*/}
                {/*                style={{*/}
                {/*                    data: { fill: ({ datum }) => {*/}
                {/*                            const color = "#59b391";*/}
                {/*                            return datum.x === 1 ? color : "transparent";*/}
                {/*                        }*/}
                {/*                    }*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <VictoryPie*/}
                {/*                standalone={false}*/}
                {/*                width={200} height={200}*/}
                {/*                data={[{ x: 1, y: 100 }]}*/}
                {/*                innerRadius={120}*/}
                {/*                radius={70}*/}
                {/*                cornerRadius={55}*/}
                {/*                labels={() => null}*/}
                {/*                style={{*/}
                {/*                    data: { fill: ({ datum }) => {*/}
                {/*                            const color = "#e9edf2";*/}
                {/*                            return datum.x === 1 ? color : "transparent";*/}
                {/*                        }*/}
                {/*                    }*/}
                {/*                }}*/}
                {/*            />*/}
                {/*            <VictoryPie*/}
                {/*                standalone={false}*/}
                {/*                width={200} height={200}*/}
                {/*                data={[{ x: 2, y: 60 }, { x: 1, y: 90 }]}*/}
                {/*                innerRadius={120}*/}
                {/*                radius={70}*/}
                {/*                cornerRadius={55}*/}
                {/*                labels={() => null}*/}
                {/*                style={{*/}
                {/*                    data: { fill: ({ datum }) => {*/}
                {/*                            const color = "#5572dd";*/}
                {/*                            return datum.x === 1 ? color : "transparent";*/}
                {/*                        }*/}
                {/*                    }*/}
                {/*                }}*/}
                {/*            />*/}


                {/*        </VictoryChart>*/}
                {/*    </View>*/}
                </ScrollView>
                {/*  _________________________________________________________________________________*/}
                {/*<StatusBar style="auto" />*/}
                {/*<View style={this.styles.inputView}>*/}
                {/*    <TextInput*/}
                {/*        style={this.styles.TextInput}*/}
                {/*        placeholder="Email."*/}
                {/*        placeholderTextColor="#003f5c"*/}
                {/*        onChangeText={(email) => this.setEmail(email)}*/}
                {/*    />*/}
                {/*</View>*/}

                {/*<TouchableOpacity>*/}
                {/*    <Text style={this.styles.forgot_button}>Forgot Password?</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={this.styles.loginBtn} onPress={() => {this.login()}}>*/}
                {/*    <Text style={this.styles.loginText}>LOGIN</Text>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={this.styles.loginBtn} onPress={() => {this.navigateToHomeScreen()}}>*/}
                {/*    <Text style={this.styles.loginText}>Navigate to home screen</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>
        )
    }
}

export default function(props) {
    const navigation = useNavigation();
    return <Login {...props} navigation={navigation} />;
}




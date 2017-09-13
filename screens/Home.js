import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default class Registration extends React.Component {
  static navigationOptions = {
    title: "Home"
  };
  render() {
    const token = this.props.navigation.state.params.token;
    return (
      <View>
        <Text>{token}</Text>
      </View>
    );
  }
}

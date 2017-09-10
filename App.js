import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { StackNavigator } from "react-navigation";

class App extends React.Component {
  render() {
    return <Login />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default StackNavigator({
  Login: { screen: Login },
  Registration: { screen: Registration }
});



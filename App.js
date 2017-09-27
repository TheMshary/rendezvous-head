import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Registration from "./screens/Registration";
import CreateEvent from "./screens/CreateEvent";
import EventDetails from "./screens/EventDetails";
import { StackNavigator } from "react-navigation";

// class App extends React.Component {
//   render() {
//     return <Login />;
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default StackNavigator({
  Login: { screen: Login },
  Registration: { screen: Registration },
  Home: { screen: Home },
  CreateEvent: { screen: CreateEvent },
  EventDetails: {screen: EventDetails},
});

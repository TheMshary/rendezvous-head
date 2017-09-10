import React from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity} from "react-native";

import StatusBar from 'react-native';

export default class login extends React.Component {
  static navigationOptions = {
    title: "LOGIN",
  };

  state = {
    token: "",
    message: []
  };

  onPressLearnMore = () => {
    fetch("http://46.101.75.135/login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.textUser,
        password: this.state.textPass
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          token: responseJson.token,
          message:
            responseJson.non_field_errors == null
              ? "SUCCESSFUL"
              : responseJson.non_field_errors
        });
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

    // console.log(this.state.textUser);
    // console.log(this.state.textPass);
    // fetch("http://46.101.75.135/event/", {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //     "Authorization": "token beef159c35da3d31f028de76efbd434db4061c10"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
  };

  _onPressButton = () => {
    this.props.navigation.navigate("Registration");
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="UserName"
          onChangeText={textUser => this.setState({ textUser })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="Password"
          onChangeText={textPass => this.setState({ textPass })}
        />

        <Button
          onPress={() => {
            this.onPressLearnMore();
          }}
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />

        <TouchableOpacity onPress={this._onPressButton}>
          <Text>Registration!</Text>
        </TouchableOpacity>

        <Text>{this.state.message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ListView
} from "react-native";

export default class App extends React.Component {
  onPressLearnMore = () => {
    // console.log(this.state.textUser);
    // console.log(this.state.textPass);
    // fetch("http://46.101.75.135/register/", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //     //"Authorization": "token <tokenString>"
    //   },
    //   body: JSON.stringify({
    //     username: this.state.textUser,
    //     password: this.state.textPass
    //   })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    console.log(this.state.textUser);
    console.log(this.state.textPass);
    fetch("http://46.101.75.135/event/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "token 235cee68ba02de8cd175a3019c2fb06572d665bd"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });

  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={textUser => this.setState({ textUser })}
        />

        <TextInput
          style={{ height: 40 }}
          placeholder="Type here to translate!"
          onChangeText={textPass => this.setState({ textPass })}
        />

        <Button
          onPress={() => {
            this.onPressLearnMore();
          }}
          title="Tap me!"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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

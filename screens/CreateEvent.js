import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  StatusBar
} from "react-native";
import { observer } from "mobx-react";
import store from '../Store';

const CreateEvent = observer(class CreateEvent extends React.Component {
  static navigationOptions = {
    title: "Create Event",
    headerStyle: {
      marginTop: StatusBar.currentHeight
    }
  };

  state = {
    title: "",
    location: "",
    time: "",
    activity: ""
  };

  handleSubmit() {
    fetch("http://46.101.75.135/event/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "token " + store.token
      },
      body: JSON.stringify({
        title: this.state.title,
        location: this.state.location,
        time: this.state.time,
        activity: this.state.activity
      })
    })
      .then(responseJson => {
        console.log("RESPONSEJSON.STATUS: " + responseJson.status);
        message: responseJson.non_field_errors == null
          ? alert("Success")
          : alert(responseJson.non_field_errors);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const navigate = this.props.navigation;
    return (
      <View>
        <TextInput
          placeholder="title"
          onChangeText={title => this.setState({ title })}
        />

        <TextInput
          placeholder="location"
          onChangeText={location => this.setState({ location })}
        />

        <TextInput
          placeholder="time"
          onChangeText={time => this.setState({ time })}
        />

        <TextInput
          placeholder="activity"
          onChangeText={activity => this.setState({ activity })}
        />

        <Button
          onPress={() => {
            this.handleSubmit();
          }}
          title="Create"
        />
      </View>
    );
  }
});

export default CreateEvent;

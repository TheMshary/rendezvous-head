import React from "react";
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import { observer } from "mobx-react";
import store from "../Store";

const EventDetails = observer(
  class EventDetail extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: store.event.title,
      headerStyle: {
        marginTop: StatusBar.currentHeight
      }
    });

    constructor(props) {
      super(props);
      this.state = {
        username: "",
        message: []
      };
    }

    onPressInivte = () => {
      fetch("http://46.101.75.135/event/invite/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "token " + store.token
        },
        body: JSON.stringify({
          pk: store.event.id,
          invitee: this.state.username
        })
      }).catch(error => {
        console.error(error);
      });
      this.props.navigation.navigate("Home");
    };

    render() {
      const event = store.event;
      let i = 0;
      let attendee = event.attendees.map(attendee => (
        <Text key={i++}>{attendee.username}</Text>
      ));

      return (
        <View>
          <Text>{event.id}</Text>
          <Text>{event.title}</Text>
          <Text>{event.location}</Text>
          <Text>{event.activity}</Text>
          <Text>{event.time}</Text>
          {attendee}

          <View style={{ paddingTop: 20 }}>
            <TextInput
              style={{ height: 40 }}
              placeholder="username"
              onChangeText={username => this.setState({ username })}
            />

            <Button
              onPress={() => {
                this.onPressInivte();
              }}
              title="Invite"
              color="#841584"
            />
          </View>
        </View>
      );
    }
  }
);

export default EventDetails;

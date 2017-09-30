import React from "react";
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { observer } from "mobx-react";
import store from "../Store";

const Home = observer(
  class Home extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      title: "Events",
      headerRight: (
        <Button
          title="new event"
          onPress={() => {
            navigation.navigate("CreateEvent");
          }}
        />
      )
    });

    constructor(props) {
      super(props);
      this.state = {
        token: store.token,
        isLoading: true
      };
    }

    componentDidMount() {
      let EVENTS_URL = "http://46.101.75.135/event/";
      return fetch(EVENTS_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "token " + store.token
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          // console.log("responseJson: "+responseJson);
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

    componentWillUpdate() {
      let EVENTS_URL = "http://46.101.75.135/event/";
      return fetch(EVENTS_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "token " + store.token
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          // console.log("responseJson: "+responseJson);
          this.setState({
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          });
        })
        .catch(error => {
          console.error(error);
        });
    }

    renderEvent = event => {
      return (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              store.event = event;
              this.props.navigation.navigate("EventDetails");
            }}
          >
            <Text>{event.title}</Text>
          </TouchableOpacity>
        </View>
      );
    };

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <Text>Loading</Text>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderEvent}
          />
        </View>
      );
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Home;

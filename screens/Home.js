import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  ListView
} from "react-native";
import { observer } from "mobx-react";
import store from '../Store';

const Home = observer(class Home extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
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
      token: this.props.navigation.state.params.token,
      isLoading: true
    };
  }

  componentDidMount() {
    const token = this.props.navigation.state.params.token;
    EVENTS_URL = "http://46.101.75.135/event/";
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
        this.setState(
          {
            isLoading: false,
            dataSource: ds.cloneWithRows(responseJson)
          },
          function() {
            // do something with new state
          }
        );
      })
      .catch(error => {
        console.error(error);
      });

    // return fetch('https://facebook.github.io/react-native/movies.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     console.log("responseJson: "+responseJson);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

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
          renderRow={rowData => <Text>{rowData.title}</Text>}
        />
      </View>
    );
  }
});

export default Home;

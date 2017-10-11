import React from "react";
import {
  StyleSheet,
  ListView,
  View,
  TouchableOpacity,
  StatusBar,
  AsyncStorage
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label,
  Spinner,
  Footer,
  FooterTab,
  H3
} from "native-base";
import { observer } from "mobx-react";
import store from "../Store";

const Home = observer(
  class Home extends React.Component {
    static navigationOptions = ({ navigation }) => ({
      headerRight: (
        <Button
          transparent
          onPress={() => {
            navigation.navigate("CreateEvent");
          }}
        >
          <Icon
            name="add"
            style={{ fontSize: 35, color: "#fff", fontWeight: "bold" }}
          />
        </Button>
      ),
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#d32f2f",
        borderBottomColor: "#fff",
        marginTop: StatusBar.currentHeight
      },
      headerLeft: null
    });

    constructor(props) {
      super(props);
      this.state = {
        token: store.token,
        isLoading: true
      };
    }

    componentDidMount() {
      this.fetchData();
    }

    componentWillUpdate() {
      this.fetchData();
    }

    fetchData = () => {
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
          this.setState({
            isLoading: false,
            dataSourceCreated: ds.cloneWithRows(responseJson.created),
            dataSourceAttending: ds.cloneWithRows(responseJson.attending)
          });
        })
        .catch(error => {
          console.error(error);
        });
    };

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
            <Spinner color="#d32f2f" />
          </View>
        );
      }

      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <StatusBar backgroundColor="#d32f2f" barStyle="light-content" />
          <Button
            title="Log Out and Get Out!"
            onPress={async () => {
              await AsyncStorage.removeItem("token");
              this.props.navigation.navigate("Login");
            }}
          />
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSourceCreated}
            renderRow={this.renderEvent}
          />
          <ListView
            enableEmptySections={true}
            dataSource={this.state.dataSourceAttending}
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

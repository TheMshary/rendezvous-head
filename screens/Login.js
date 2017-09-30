import React from "react";
import { StatusBar } from "react-native";
import {
  Container,
  Button,
  Icon,
  Content,
  Text,
  Form,
  Item,
  Input,
  Label
} from "native-base";
import Font from "expo";
import { observer } from "mobx-react";
import store from "../Store";

const login = observer(
  class login extends React.Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
      title: "Login",
      headerRight: (
        <Button
          transparent
          onPress={() => {
            navigation.navigate("Registration");
          }}
        >
          <Icon ios="ios-person-add" android="md-person-add" />
        </Button>
      )
    });

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

          store.token = responseJson.token;

          if (responseJson.non_field_errors == null)
            this.props.navigation.navigate("Home");
        })
        .catch(error => {
          console.error(error);
        });
    };

    async componentWillMount() {
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
      });
    }

    render() {
      return (
        <Container>
          <Content padder>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input onChangeText={textUser => this.setState({ textUser })} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input onChangeText={textPass => this.setState({ textPass })} />
              </Item>
            </Form>

            <Button
              block
              onPress={() => {
                this.onPressLearnMore();
              }}
            >
              <Text>Login</Text>
            </Button>

            <Text>{this.state.message}</Text>
          </Content>
        </Container>
      );
    }
  }
);

export default login;

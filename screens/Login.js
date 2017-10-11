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
  Label,
  Spinner,
  Footer,
  FooterTab,
  H3,
  Toast
} from "native-base";
import Expo from "expo";
import { observer } from "mobx-react";
import store from "../Store";

const login = observer(
  class login extends React.Component {
    static navigationOptions = () => ({
      title: "Login",
      headerStyle: {
        marginTop: StatusBar.currentHeight
      },
      header: null
    });

    constructor(props) {
      super(props);
      this.state = {
        isLoading: true
      };
    }

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
        .then(response => {
          this.setState({ status: response.status });
          return response.json();
        })
        .then(responseJson => {
          if (this.state.status == 200) {
            store.token = responseJson.token;
            this.props.navigation.navigate("Home");
          } else {
            Toast.show({
              text: "Wrong username/password!",
              position: "top",
              buttonText: "Dismiss",
              type: "danger",
              duration: "2200"
            });
          }
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
      this.setState({ isLoading: false });
    }

    render() {
      if (this.state.isLoading) {
        return (
          <Container style={{ flex: 1, paddingTop: 20 }}>
            <Content padder>
              <Text>Loading</Text>
              <Spinner color="#d32f2f" />
            </Content>
          </Container>
        );
      }

      return (
        <Container style={{ backgroundColor: "#e0e0e0" }}>
          <Content
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center"
            }}
            padder
          >
            <Form>
              <Item floatingLabel style={{ borderBottomColor: "#d32f2f" }}>
                <Icon name="contact" active={true} size={32} />
                <Label> Username</Label>
                <Input
                  onChangeText={textUser =>
                    this.setState({ textUser: textUser })}
                />
              </Item>
              <Item floatingLabel style={{ borderBottomColor: "#d32f2f" }}>
                <Icon name="lock" active={true} size={32} />
                <Label> Password</Label>
                <Input
                  onChangeText={textPass =>
                    this.setState({ textPass: textPass })}
                  secureTextEntry={true}
                />
              </Item>

              <Button
                iconLeft
                block
                onPress={() => {
                  this.onPressLearnMore();
                }}
                style={{ marginTop: 20, backgroundColor: "#d32f2f" }}
              >
                <Icon name="log-in" />
                <Text>Login</Text>
              </Button>
            </Form>
          </Content>
          <Footer>
            <FooterTab>
              <Button
                full
                onPress={() => {
                  this.props.navigation.navigate("Registration");
                }}
                style={{ backgroundColor: "#fff" }}
              >
                <H3>Sign Up</H3>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
);
export default login;

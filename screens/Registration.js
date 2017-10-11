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
import store from "../Store";

export default class Registration extends React.Component {
  static navigationOptions = () => ({
    title: "REGISTRATION",
    headerTintColor: "#d32f2f",
    headerStyle: {
      borderBottomColor: "#d32f2f",
      marginTop: StatusBar.currentHeight
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  onPressLearnMore = () => {
    fetch("http://46.101.75.135/register/", {
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
          this.props.navigation.navigate("Login");
        } else {
          Toast.show({
            text: "Username Already exist!",
            position: "bottom",
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

  render() {
    return (
      <Container style={{ backgroundColor: "#e0e0e0" }}>
        <Content
          contentContainerStyle={{
            flex: 0.9,
            justifyContent: "center"
          }}
          padder
        >
          <Form>
            <Item last style={{ borderBottomColor: "#d32f2f" }}>
              <Icon name="contact" active={true} size={32} />
              <Input
                placeholder="Username"
                onChangeText={textUser => this.setState({ textUser })}
              />
            </Item>
            <Item last style={{ borderBottomColor: "#d32f2f", marginTop: 15 }}>
              <Icon name="lock" active={true} size={32} />
              <Input
                placeholder=" Password"
                onChangeText={textPass => this.setState({ textPass })}
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
              <Icon name="add-circle" />
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

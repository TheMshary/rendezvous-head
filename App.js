import React from "react";
import {
	ActivityIndicator,
	ListView,
	AppRegistry,
	SectionList,
	StyleSheet,
	Text,
	View,
	Grid,
	Button,
	StatusBar,
	TextInput,
	TouchableOpacity,
	Image
} from 'react-native';
import Form from 'react-native-form';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import {
	TabNavigator,
	StackNavigator,
	NavigationActions,
} from 'react-navigation';
import { observer } from "mobx-react";
import store from './Store';


// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------



const login = observer(class login extends React.Component {
  static navigationOptions = {
    title: "LOGIN"
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
      	// store token in store
      	store.token = responseJson.token;
        this.setState({
          token: responseJson.token,
          message:
            responseJson.non_field_errors == null
              ? "SUCCESSFUL"
              : responseJson.non_field_errors
        });

        if (responseJson.non_field_errors == null)
          this.props.navigation.navigate("Events");
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
  };

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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

// ------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------

// import KeyboardSpacer from 'react-native-keyboard-spacer';

// This gives you the height of the status bar
// It says here: https://stackoverflow.com/a/38746516
// That this only works for Android
// And in iOS it returns 'undefined'
//StatusBar.currentHeight

const EventCreate = observer(class EventCreate extends React.Component {

	static navigationOptions = {
		title: 'Create Event',
		headerStyle: {
			marginTop: StatusBar.currentHeight
		},
	}

	handleSubmit() {
		fetch("http://46.101.75.135/event/", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"Authorization": "token "+store.token
		},
		body: JSON.stringify({
			title: this.state.title,
			location: this.state.location,
			time: this.state.time,
			activity: this.state.activity,
			})
		})
		.then(response => {
			console.log("RESPONSE.STATUS: "+response.status);
		})
		.catch(error => {
			console.error(error);
		});
	}

	
	render() {
		const navigate  = this.props.navigation;
		return (
			<View>
				<Image source={{uri: 'http://img11.deviantart.net/072b/i/2011/206/7/0/the_ocean_cherry_tree_by_tomcadogan-d41nzsz.png', static: true}}
                 style={{flex: 1}}/>

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
})

const Events = observer(class Events extends React.Component {

	static navigationOptions = ({ navigation, screenProps }) => ({
		title: 'Events',
		headerRight: <Button
						title="new event"
						onPress={()=>{ navigation.navigate('EventCreate'); }}
						/>,
		headerStyle: {
			marginTop: StatusBar.currentHeight
		},
	});

	constructor(props) {
		super(props);
		this.state = {
			// dataSource: null,
			isLoading: true
		}
	}

	componentDidMount() {
		EVENTS_URL = "http://46.101.75.135/event/"
		// token: beef159c35da3d31f028de76efbd434db4061c10
		return fetch(EVENTS_URL, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "token "+store.token
				}
			})
		.then((response) => response.json())
		.then((responseJson) => {
			let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
			// console.log("responseJson: "+responseJson);
			this.setState({
				isLoading: false,
				dataSource: ds.cloneWithRows(responseJson),
			}, function() {
				// do something with new state
			});
		})
		.catch((error) => {
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
				<View style={{flex: 1, paddingTop: 20}}>
					<Button
						title="new event"
						onPress={() =>
							this.props.navigation.navigate('EventCreate')
						}
					/>
					<Text>Loading</Text>
					<ActivityIndicator />
				</View>
			);
		}

		return (
			<View style={{flex: 1, paddingTop: 20}}>
				<Button
					title="new event"
					onPress={() =>
						this.props.navigation.navigate('EventCreate')
					}
				/>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Text>{rowData.title}</Text>}
				/>
			</View>
		);
	}
})

export default StackNavigator({
	login: { screen: login },
	Events: { screen: Events },
	EventCreate: { screen: EventCreate, },
});

// https://stackoverflow.com/a/44396926


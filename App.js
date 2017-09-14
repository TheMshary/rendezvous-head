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
} from 'react-native';
import Form from 'react-native-form';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";

import {
	TabNavigator,
	StackNavigator,
	NavigationActions,
} from 'react-navigation';

// This gives you the height of the status bar
// It says here: https://stackoverflow.com/a/38746516
// That this only works for Android
// And in iOS it returns 'undefined'
//StatusBar.currentHeight

class EventCreate extends React.Component {

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
				"Authorization": "token beef159c35da3d31f028de76efbd434db4061c10"
		},
		body: JSON.stringify({
			title: this.state.title,
			location: this.state.location,
			time: this.state.time,
			activity: this.state.activity,
			})
		})
		// .then(response => response.json())
		.then(responseJson => {
			console.log("RESPONSEJSON.STATUS: "+responseJson.status);
		})
		.catch(error => {
			console.error(error);
		});
	}

	
	render() {
		const navigate  = this.props.navigation;
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
}

class Events extends React.Component {

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
		return fetch(EVENTS_URL, {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "token beef159c35da3d31f028de76efbd434db4061c10"
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
}


class App extends React.Component {
	
	render() {
		return (
			<View>
				<Text>BEFORE</Text>
				<AppNavigator />
				<Text>AFTER</Text>
			</View>
		);
	}
}

export default StackNavigator({
	Events: { screen: Events },
	EventCreate: { screen: EventCreate, },
});

// https://stackoverflow.com/a/44396926


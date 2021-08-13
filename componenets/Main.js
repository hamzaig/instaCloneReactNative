import React, { Component } from 'react'
import { View, Text } from "react-native";
import { bindActionCreators } from 'redux';
import { fatchUser } from "../redux/actions/index.js";
import { connect } from 'react-redux';

export class Main extends Component {
    componentDidMount() {
        this.props.fatchUser();
    }
    render() {
        const { currentUser } = this.props;
        // console.log(currentUser);
        if (currentUser === undefined) {
            return (
                <View></View>
            );
        }
        return (
            <View style={{ flex: "1", justifyContent: "center" }}>
                <Text>{currentUser.name} is LoggedIn</Text>
            </View>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fatchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

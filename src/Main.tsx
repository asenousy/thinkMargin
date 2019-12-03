import React, { PureComponent } from "react";
import { StyleSheet, View, Platform, StatusBar, AppState } from "react-native";
import Constants from "expo-constants";
import { AdMobBanner } from "expo-ads-admob";
import Navigator from "./Navigator";
import configs from "../configs.json";
import storeReview from "./storeReview";

const AD_UNIT_ID = __DEV__
  ? configs.testAdUnitID
  : configs[Platform.OS].adUnitID;

class Main extends PureComponent {
  state = {
    appState: AppState.currentState
  };

  componentDidMount() {
    storeReview();
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      storeReview();
      // TODO: check for thinkMargin update and download new code
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" />
        <AdMobBanner adUnitID={AD_UNIT_ID} servePersonalizedAds />
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "aliceblue"
  }
});

export default Main;

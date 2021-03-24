import React, { PureComponent } from "react";
import { StyleSheet, View, Platform, StatusBar, AppState } from "react-native";
import Constants from "expo-constants";
import { AdMobBanner } from "expo-ads-admob";
import Navigator from "./Navigator";
import configs from "../configs.json";
import storeReview from "./storeReview";
import * as Updates from "expo-updates";

const AD_UNIT_ID = __DEV__
  ? configs.testAdUnitID
  : configs[Platform.OS].adUnitID;

class Main extends PureComponent {
  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    storeReview();
    AppState.addEventListener("change", this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this.handleAppStateChange);
  }

  handleAppStateChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      storeReview();
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        if (__DEV__) throw error;
      }
    }
    this.setState({ appState: nextAppState });
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <StatusBar barStyle="dark-content" />
        <AdMobBanner
          // style={styles.ad}
          adUnitID={AD_UNIT_ID}
          servePersonalizedAds
        />
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "aliceblue",
  },
  ad: {
    marginTop: Constants.statusBarHeight,
    position: "absolute",
  },
});

export default Main;

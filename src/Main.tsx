import React, { memo } from "react";
import { StyleSheet, View, Platform, StatusBar } from "react-native";
import Constants from "expo-constants";
import { AdMobBanner } from "expo-ads-admob";
import Navigator from "./Navigator";
import configs from "../configs.json";

const AD_UNIT_ID = __DEV__
  ? configs.testAdUnitID
  : configs[Platform.OS].adUnitID;

const Main = () => (
  <View style={styles.wrapper}>
    <StatusBar barStyle="dark-content" />
    <AdMobBanner adUnitID={AD_UNIT_ID} servePersonalizedAds />
    <Navigator />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "aliceblue"
  }
});

export default memo(Main);

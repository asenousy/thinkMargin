import React from "react";
import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { AdMobBanner } from "expo-ads-admob";
import PricePage from "./components/pages/PricePage";
import MarginPage from "./components/pages/MarginPage";
import CostPage from "./components/pages/CostPage";
import { FontAwesome } from "@expo/vector-icons";
import configs from "../configs.json";

const TEST_AD = "ca-app-pub-3940256099942544/6300978111";

const navigator = createBottomTabNavigator(
  {
    Price: PricePage,
    Margin: MarginPage,
    Cost: CostPage
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case "Price":
            var iconName = "tag";
            break;
          case "Margin":
            var iconName = "percent";
            break;
          case "Cost":
            var iconName = "shopping-cart";
            break;
        }
        return <FontAwesome name={iconName} size={24} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      keyboardHidesTabBar: false,
      labelStyle: {
        fontSize: 13
      }
    }
  }
);

const statusBarPaddingWrapper = () => {
  const AppContainer = createAppContainer(navigator);
  return (
    <View style={styles.wrapper}>
      <AdMobBanner
        adUnitID={configs.adUnitID || TEST_AD}
        servePersonalizedAds
      />
      <AppContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "aliceblue"
  }
});

export default statusBarPaddingWrapper;

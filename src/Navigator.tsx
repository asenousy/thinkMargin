import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import PricePage from "./components/pages/PricePage";
import MarginPage from "./components/pages/MarginPage";
import CostPage from "./components/pages/CostPage";
import { FontAwesome } from "@expo/vector-icons";

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
    },
    lazy: false
  }
);

export default createAppContainer(navigator);

import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import PricePage from "./components/pages/PricePage";
import MarginPage from "./components/pages/MarginPage";
import CostPage from "./components/pages/CostPage";

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
        return <Icon name={iconName} size={24} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      keyboardHidesTabBar: false,
      style: { paddingTop: 5 },
      labelStyle: {
        fontSize: 13
      }
    }
  }
);

export default createAppContainer(navigator);

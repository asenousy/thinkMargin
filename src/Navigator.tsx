import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PricePage from "./components/pages/PricePage";
import MarginPage from "./components/pages/MarginPage";
import CostPage from "./components/pages/CostPage";
import { FontAwesome } from "@expo/vector-icons";
import { responsive } from "./helpers";

const Tab = createBottomTabNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            switch (route.name) {
              case "Price":
                var name = "tag";
                break;
              case "Margin":
                var name = "percent";
                break;
              case "Cost":
                var name = "shopping-cart";
                break;
            }
            return <FontAwesome name={name as any} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          keyboardHidesTabBar: false,
          labelStyle: responsive({
            fontSize: 13,
          }),
        }}
        lazy={false}
      >
        <Tab.Screen name="Price" component={PricePage} />
        <Tab.Screen name="Margin" component={MarginPage} />
        <Tab.Screen name="Cost" component={CostPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;

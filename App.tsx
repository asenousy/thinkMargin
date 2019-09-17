import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Price from "./components/Price";
import Margin from "./components/Margin";
import Cost from "./components/Cost";

const navigator = createBottomTabNavigator({
  Price,
  Margin,
  Cost
});

export default createAppContainer(navigator);

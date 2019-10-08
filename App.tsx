import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import PricePage from "./components/PricePage";
import MarginPage from "./components/MarginPage";
import CostPage from "./components/CostPage";

const navigator = createBottomTabNavigator({
  Price: PricePage,
  Margin: MarginPage,
  Cost: CostPage
});

export default createAppContainer(navigator);

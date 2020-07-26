import { createAppContainer, createSwitchNavigator } from "react-navigation";

import StartupScreen from "../modules/Authentication/StartupScreen";
import AuthNavigator from "./AuthNavigator";
import OboNavigator from "./OboNavigator";

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Login: AuthNavigator,
  Obo: OboNavigator,
});

export default createAppContainer(MainNavigator);

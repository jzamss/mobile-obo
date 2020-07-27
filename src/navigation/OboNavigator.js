import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createTabNavigator, defaultNavigationOptions } from "../rsi-react-native";


import LogoutScreen from "../modules/Authentication/LogoutScreen";
import SettingsScreen from "../modules/Settings/SettingsScreen";
import ConnectionSettingScreen from "../modules/Settings/ConnectionSettingScreen";

import PermitTypeListScreen from "../modules/Obo/PermitTypeListScreen";
import DownloadScreen from "../modules/Obo/DownloadScreen";
import PermitListScreen from "../modules/Obo/PermitListScreen";
import PermitScreen from "../modules/Obo/PermitScreen";
import FindingListScreen from "../modules/Obo/FindingListScreen";
import FindingScreen from "../modules/Obo/FindingScreen";
import GeoTagScreen from "../modules/Obo/GeoTagScreen";

const LogoutNavigator = createStackNavigator(
  {
    Logout: LogoutScreen,
  },
  defaultNavigationOptions
);

const SettingNavigator = createStackNavigator(
  {
    Settings: SettingsScreen,
    Connection: ConnectionSettingScreen,
  },
  defaultNavigationOptions
);

const OboNavigator = createStackNavigator(
  {
    Home: PermitTypeListScreen,
    Download: DownloadScreen,
    Permits: PermitListScreen,
    Permit: PermitScreen,
    Findings: FindingListScreen,
    Finding: FindingScreen,
    GeoTag: GeoTagScreen,
  },
  defaultNavigationOptions
);


const tabs = [
  {name: 'Logout', screen: LogoutNavigator, icon: "log-out" },
  {name: 'Home', screen: OboNavigator, icon: "home", IsInitialRoute: true },
  {name: 'Settings', screen: SettingNavigator, icon: "settings"},
]

export default createTabNavigator(tabs);

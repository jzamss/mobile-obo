import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createTabNavigator, defaultNavigationOptions } from "../rsi-react-native";

import LoginScreen from "../modules/Authentication/LoginScreen";
import SettingsScreen from "../modules/Settings/SettingsScreen";
import ConnectionSettingScreen from "../modules/Settings/ConnectionSettingScreen";


const AuthNavigator = createStackNavigator(
  {
    Login: LoginScreen,
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

const tabs = [
  {name: 'Login', screen: AuthNavigator, icon: "log-in" },
  {name: 'Settings', screen: SettingNavigator, icon: "settings"},
]

export default createTabNavigator(tabs);

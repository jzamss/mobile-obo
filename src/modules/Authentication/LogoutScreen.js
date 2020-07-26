import React from "react";
import { useDispatch } from "react-redux";
import { NavigationActions } from "react-navigation";
import { LogoutComponent } from "../../rsi-react-native";

import { appIcon } from "../assets";
import { authActions } from "../actions";

const LogoutScreen = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    NavigationActions.navigate({ routeName: "Login" });
  };

  return (
    <LogoutComponent
      logo={appIcon}
      onLogout={logoutHandler}
    />
  );
};

LogoutScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

export default LogoutScreen;

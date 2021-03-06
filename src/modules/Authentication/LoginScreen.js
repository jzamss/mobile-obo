import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  StyleSheet,
  Text,
  Alert,
  ActivityIndicator,
  Image,
  View,
} from "react-native";

import {
  Button,
  LabelInput,
  Colors,
  Fonts,
  isNetworkConnected,
  LoginComponent,
} from "../../rsi-react-native";

import { appIcon } from "../assets";
import { authActions } from "../actions";

const Modes = {
  loading: "loading",
  initial: "initial",
  register: "register",
  recover: "recover",
  login: "login",
};

const Loading = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image style={styles.logo} source={appIcon} />
      <ActivityIndicator />
    </View>
  );
};

const RegisterOption = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Image style={styles.logo} source={appIcon} />
      <Text style={styles.title}>Terminal Registration</Text>
      <View style={{ marginTop: 10 }}>
        <Button
          buttonText={styles.buttonText}
          title="Register New Terminal"
          onPress={props.onRegister}
        />
        <Button
          color={Colors.secondaryButtonColor}
          buttonText={styles.buttonText}
          title="Recover Terminal"
          onPress={props.onRecover}
        />
      </View>
    </View>
  );
};

const RegisterTerminal = (props) => {
  const [entity, setEntity] = useState({});

  const inputChangeHandler = (id, value) => {
    const updatedEntity = { ...entity, [id]: value };
    setEntity(updatedEntity);
  };

  return (
    <View style={styles.registerTerminal}>
      <Image style={styles.logo} source={appIcon} />
      <Text style={styles.title}>Terminal Information</Text>

      <LabelInput
        id="terminalid"
        label="Terminal Key"
        initialValue={entity.terminalid}
        onInputChange={inputChangeHandler}
      />
      <LabelInput
        id="registeredby"
        label="Registered By"
        initialValue={entity.registeredby}
        onInputChange={inputChangeHandler}
      />
      <View style={styles.buttonContainer}>
        <Button style={styles.button} title="Cancel" onPress={props.onCancel} />
        <Button
          style={styles.button}
          title="Submit"
          onPress={() => props.onSubmit(entity)}
        />
      </View>
    </View>
  );
};

const LoginScreen = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.authenticated);
  const [isLogging, setIsLogging] = useState(false);
  const [mode, setMode] = useState(Modes.loading);

  const dispatch = useDispatch();

  const onLoginHandler = async (user) => {
    setIsLogging(true);
    try {
      dispatch( await authActions.login(user));
    } catch (err) {
      setIsLogging(false);
      Alert.alert("Authentication Error!", err, [{ text: "Okay" }]);
    }
  };

  const loadTerminalStatus = async () => {
    if (await isNetworkConnected()) {
      const terminal = await authActions.findTerminal();
      if (terminal) {
        setMode(Modes.login);
      } else {
        setMode(Modes.initial);
      }
    } else {
      setMode(Modes.login);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      props.navigation.navigate("Obo");
    } else {
      loadTerminalStatus();
    }
  }, [isAuthenticated]);

  const registerNewTerminal = () => {
    setMode(Modes.register);
  };

  const recoverTerminal = () => {
    authActions
      .recoverTerminal()
      .then(() => setMode(Modes.login))
      .catch((err) => alert(err.toString()));
  };

  const registerTerminal = (terminal) => {
    authActions
      .registerTerminal(terminal)
      .then(() => setMode(Modes.login))
      .catch((err) => alert(err.toString()));
  };

  let component;
  if (mode === Modes.loading) {
    component = <Loading />;
  } else if (mode === Modes.initial) {
    component = (
      <RegisterOption
        onRegister={registerNewTerminal}
        onRecover={recoverTerminal}
      />
    );
  } else if (mode === Modes.register) {
    component = (
      <RegisterTerminal
        onCancel={() => setMode(Modes.initial)}
        onSubmit={registerTerminal}
      />
    );
  } else {
    component = (
      <LoginComponent
        logo={appIcon}
        onLogin={onLoginHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      {component}
      {isLogging && <ActivityIndicator size="small" />}
    </View>
  );
};

LoginScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 192,
    height: 192,
    marginVertical: 30,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
    width: "100%",
  },
  button: {
    width: 150,
  },

  title: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: "bold",
  },
  registerTerminal: {
    width: 300,
  },
  buttonText: {
    fontSize: Fonts.medium,
  },
});

export default LoginScreen;

// import { getUniqueId } from "react-native-device-info";
//TODO: SIMULATION
const getUniqueId = () => {
  return "12345:67890";
}

import { getService } from "../../rsi-react-native";
import { db } from "../../rsi-react-native";

const Service = getService();



export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

const schema = "user";
const terminalSchema = "terminal";

export const findTerminal = async () => {
  const deviceId = await getUniqueId();
  const terminal = await db.find({
    schema: terminalSchema,
    where: { macaddress: deviceId },
  });
  return terminal;
};

export const loadTerminal = async (Modes) => {
  try {
    await recoverTerminal();
    return Modes.login;
  } catch (err) {
    return Modes.initial;
  }
};

export const registerTerminal = async (device) => {
  try {
    const deviceId = await getUniqueId();
    device.macaddress = deviceId;
    const svc = await Service.lookup("WaterworksMobileLoginService");
    const terminal = await svc.register(device);
    await db.create({ schema: terminalSchema, __DEBUG__: true }, terminal);
    console.log("done")
  } catch (err) {
    console.log("registerTerminal ERROR", err);
    throw "An error occured registering terminal. Please try again.";
  }
};

export const recoverTerminal = async () => {
  const deviceId = getUniqueId();
  try {
    const svc = await Service.lookup("WaterworksMobileLoginService");
    const terminal = await svc.recover({ macaddress: deviceId });
    console.log("TERMINAL", terminal)
    await db.create({ schema: terminalSchema, __DEBUG__: true }, terminal);
  } catch (err) {
    console.log("recoverTerminal ERROR", err);
    throw "Terminal is not yet registered.";
  }
};

export const login = (user) => {
  return async (dispatch) => {
    if (!user.username || !user.password) {
      throw "Verify your username and password.";
    }
    try {
      user.username = user.username.toLowerCase();
      const authenticatedUser = await authenticate(user);
      return dispatch({ type: SET_USER, user: authenticatedUser });
    } catch (err) {
      throw err.toString();
    }
  };
};

export const logout = () => {
  return { type: RESET_USER };
};

const getLocalUser = async (user) => {
  const params = { schema, where: { username: user.username} };
  const localUser = await db.find(params);
  if (localUser && localUser.password !== user.password) {
    throw "Invalid username or password.";
  }
  return localUser;
};

const authenticateServerUser = async (user) => {
  try {
    const svc = await Service.lookup("WaterworksMobileLoginService");
    const authenticatedUser = await svc.login(user);
    await db.create({ schema: "user" }, authenticatedUser);
    return authenticatedUser;
  } catch (err) {
    console.log("ERR AUTH", err);
    throw err.toString();
  }
};

const authenticate = async (user) => {
  let authenticatedUser  = await getLocalUser(user);
  if (!authenticatedUser) {
    authenticatedUser = await authenticateServerUser(user);
  }
  return authenticatedUser;
};

export const loadUsers = async () => {
  return await db.getList({ schema: "user" });
};

export const removeUser = async (user) => {
  await db.remove({
    schema: "user",
    where: { objid: user.objid },
  });
  return await loadUsers();
};


import { db } from "../../rsi-react-native";
import Connection from "../../models/Connection";

const connectionSchema = { schema: "connection" };

export const SET_CONNECTION = "SET_CONNECTION";
export const UPDATE_CONNECTION = "UPDATE_CONNECTION";

export const updateConnection = (connection) => {
  return async (dispatch) => {
    await db.update(connectionSchema, connection);
    dispatch({ type: UPDATE_CONNECTION, connection });
  };
};

export const loadConnection = () => {
  return async (dispatch) => {
    let connection = await db.find(connectionSchema);
    if (!connection) {
      connection = new Connection("192.168.1.7", "8070");
      connection = await db.create(connectionSchema, connection);
    }
    dispatch({ type: SET_CONNECTION, connection });
  };
};

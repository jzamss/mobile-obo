// import NetInfo from "@react-native-community/netinfo";


//TODO:
export const isNetworkConnected = async () => {
  return true;
  // const state = await NetInfo.fetch()
  // return state.isConnected;
}


export const mapNumber = (number, in_min, in_max, out_min, out_max) => {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
};

export const capitalizeFirstChar = str => {
  if (!str) return str;
  return str[0].toUpperCase() + str.substring(1);
}



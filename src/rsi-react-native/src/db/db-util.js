const toDate = (value) => {
  if (value === null || value === undefined) {
    return null;
  }

  if (isDate(value)) {
    return value;
  }

  return new Date(value);
};

const serializeDate = (value) => {
  if (!value) return null;
  return value.toString();
}

const deserializeDate = (value) => {
  if (!value) return null;
  return new Date(value);
}

const serializeJson = (value) => {
  if (!value) return null;
  return JSON.stringify(value);
}

const deserializeJson = (value) => {
  if (!value) return null;
  return JSON.parse(value);
}

const serializeBoolean = (value) => {
  return value ? 1 : 0;
}

const deserializeBoolean = (value) => {
  return value === 1;
}

const formatDate = (date) => {
  if (!date) return null;
  const sdt = date.toISOString();
  return sdt.replace("T", " ").replace(/\..*/, '');
}


const isDate = (value) => {
  return typeof value.getMonth === "function";
};


export default {
  toDate,
  serializeDate,
  deserializeDate,
  serializeJson,
  deserializeJson,
  serializeBoolean,
  deserializeBoolean,
  formatDate ,
}
import dbUtil from "../rsi-react-native/src/db/db-util";

class Permit {
  constructor() {
    this.objid = null;
    this.permittypeid = null;
    this.state = null;
    this.seqno = null;
    this.permitno = null;
    this.permitteename = null;
    this.permitteeaddress = null;
    this.title = null;
    this.lng = null;
    this.lat = null;
    this.findings = [];
  }

  get _serializer() {
    return {
      findings: dbUtil.serializeJson,
    };
  }

  get _deserializer() {
    return {
      findings: dbUtil.deserializeJson,
    };
  }
}

export default Permit;

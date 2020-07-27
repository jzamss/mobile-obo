import { db, capitalizeFirstChar } from "../../rsi-react-native";

export const SET_PERMIT_TYPES = "SET_PERMIT_TYPES";
export const SET_PERMITS = "SET_PERMITS";
export const SET_PERMIT = "SET_PERMIT";
export const UPDATE_PERMIT = "UPDATE_PERMIT";
export const SET_FINDINGS = "SET_FINDINGS";
export const SET_FINDING = "SET_FINDING";
export const ADD_FINDING = "ADD_FINDING";

import DUMMY_DATA from "../DUMMY_DATA";

export const loadPermitTypes = (user) => {
  return async (dispatch) => {
    const permitTypes = await db.getList({
      schema: "permittype",
      where: { assigneeid: user.objid },
    });
    return dispatch({ type: SET_PERMIT_TYPES, permitTypes });
  };
};

export const downloadPermitTypes = async ({ user, updateStatus }) => {
  //TODO:
  // const svc = await Service.lookup("WaterworksMobileSupportService");
  // const permitTypes = await svc.getPermitTypes({ assigneeid: user.objid });
  const permitTypes = DUMMY_DATA.permitTypes;

  if (permitTypes.length === 0) {
    throw "There are no available permits assigned.";
  }

  for (let i = 0; i < permitTypes.length; i++) {
    const permitType = permitTypes[i];
    await downloadPermitType({ user, updateStatus, permitType });
  }
};

export const loadPermits = async (permitType) => {
  return async (dispatch) => {
    const permits = await db.getList({
      schema: "permit",
    });
    // const permits = await db.getList({
    //   schema: "permit",
    //   where: { permittypeid: permitType.objid },
    // });
    return dispatch({ type: SET_PERMITS, permits });
  };
};

const findingTypes = [
  {type: "electrical", title: "Electrical", count: 0},
  {type: "mechanical", title: "Mechanical", count: 0},
]

export const setPermit = (permit) => {
  return async dispatch => {
    let sql = "SELECT type, count(*) as count FROM finding "
    const findings = await db.getBySql({sql, where: {permitid: permit.objid}, groupBy: "type"});
    for (let i = 0; i < findings.length; i++) {
      const finding = findings[i];
      finding.title = capitalizeFirstChar(finding.type) + " Findings";
    }

    const missingFindingTypes = [];
    for (let i = 0; i < findingTypes.length; i++) {
      const ft = findingTypes[i];
      if (findings.findIndex(f => f.type === ft.type) < 0) {
        missingFindingTypes.push(ft);
      }
    }
    findings.push(...missingFindingTypes);
    permit.findings = findings;
    return dispatch({ type: SET_PERMIT, permit });
  }
};

export const loadFindings = ({ permit, findingType }) => {
  return async (dispatch) => {
    const findings = await db.getList({
      schema: "finding",
      where: { permitid: permit.objid, type: findingType.type },
    });
    console.log("load findings", findings)
    return dispatch({ type: SET_FINDINGS, findings });
  };
};

export const setFinding = (finding) => {
  return { type: SET_FINDING, finding };
};

export const saveLocation = (permit, location) => {
  return async (dispatch) => {
    const updatedPermit = { ...account };
    updatedPermit.lat = location.lat;
    updatedPermit.lng = location.lng;
    await db.update({ schema: "permit" }, updatedPermit);
    return dispatch(setPermit(updatedPermit));
  };
};

export const createFinding = ({permit, finding}) => {
  return async dispatch => {
    finding.objid = permit.objid + (Math.random() * 8).toString();
    console.log("create finding", finding)
    console.log("CREATE FINDING", finding)
    await db.create({schema: "finding"}, finding);
    return dispatch({type: ADD_FINDING, finding});
  }
}


const downloadPermitType = async ({
  user,
  updateStatus,
  permitType: downloadPermitType,
}) => {
  const permitType = await fetchPermitType(downloadPermitType, user);
  const status = {
    permittypeid: permitType.objid,
    recordcount: permitType.recordcount,
    downloadedcount: 0,
  };
  updateStatus({ ...status });
  permitType.readcount = 0;
  await savePermitType(permitType);
  await downloadPermits({ permitType, updateStatus, status });
};

const fetchPermitType = async (permitType, user) => {
  // TODO:
  // const svc = await Service.lookup("WaterworksMobileSupportService");
  // return await svc.getPermits({ objid: permitType.objid, assigneeid: user.objid });
  return permitType;
};

const savePermitType = async (permitType) => {
  await db.remove({ schema: "permittype", where: { objid: permitType.objid } });
  await db.create({ schema: "permittype" }, permitType);
};

const fetchPermits = async (permitType, start) => {
  const limit = 10;
  //TODO:
  // const svc = await Service.lookup("WaterworksMobileSupportService");
  // return await svc.getPermits({ permittypeid: permitType.objid, start, limit });
  return DUMMY_DATA.permits.filter(
    (permit) => permit.permittypeid === permitType.objid
  );
};

const downloadPermits = async ({ permitType, updateStatus, status }) => {
  let start = permitType.readcount;
  while (start < permitType.recordcount) {
    const permits = await fetchPermits(permitType, start);
    for (let i = 0; i < permits.length; i++) {
      const permit = permits[i];
      await db.create({ schema: "permit" }, permit);
      status.downloadedcount += 1;
      updateStatus({ ...status });
    }
    start += permits.length;
  }
};

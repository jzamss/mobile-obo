import { db } from "../../rsi-react-native";

export const SET_PERMIT_TYPES = "SET_PERMIT_TYPES";
export const SET_PERMITS = "SET_PERMITS";
export const SET_PERMIT = "SET_PERMIT";
export const UPDATE_PERMIT = "UPDATE_PERMIT";

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
  console.log("permitType", permitType)
  return async (dispatch) => {
    const permits = await db.getList({
      schema: "permit"
    });
    console.log("Permits", permits)
    // const permits = await db.getList({
    //   schema: "permit",
    //   where: { permittypeid: permitType.objid },
    // });
    return dispatch({ type: SET_PERMITS, permits });
  };
};

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
    console.log("======== permits", permits)
    for (let i = 0; i < permits.length; i++) {
      const permit = permits[i];
      await db.create({ schema: "permit" }, permit);
      status.downloadedcount += 1;
      updateStatus({ ...status });
    }
    start += permits.length;
  }
};

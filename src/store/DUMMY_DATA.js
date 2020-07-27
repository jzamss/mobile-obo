const permitTypes = [
  {
    objid: "occupancypermit",
    title: "Occupancy Permit",
    recordcount: 2,
    completed: 0,
    assigneeid: "USR5b13925b:17066eb8fad:-7eac",
  },
];

const permits = [
  {
    objid: "P001",
    permittypeid: "occupancypermit",
    state: "APPROVED",
    seqno: "01",
    permitno: "P001",
    permitteename: "Dela Cruz, Juan M.",
    permitteeaddress: "Cebu City, Philippines",
    title: "2 BR Apartment (Residential)",
    lng: null,
    lat: null,
  },
  {
    objid: "P002",
    permittypeid: "occupancypermit",
    state: "APPROVED",
    seqno: "02",
    permitno: "P002",
    permitteename: "Nazarono, Elmo M.",
    permitteeaddress: "Cebu City, Philippines",
    title: "2 BR Apartment (Commercial)",
    lng: null,
    lat: null,
  },
];


export default {
  permitTypes,
  permits
}
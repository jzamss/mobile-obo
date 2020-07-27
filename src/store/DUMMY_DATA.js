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
    findings: [
      {type: "electrical", title: "Electrical", count: 3},
      {type: "mechanical", title: "Mechanical", count: 2},
    ]
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
    findings: [
      {type: "electrical", title: "Electrical", count: 3},
      {type: "mechanical", title: "Mechanical", count: 2},
    ]
  },
];

const findings = [
  {objid: "F01", permitid: "P002", type: "electrical", description: "Discrepancy in plan (Section 1a)", fileid: null},
  {objid: "F02", permitid: "P002", type: "electrical", description: "Wrong wiring", fileid: null},
  {objid: "F03", permitid: "P002", type: "mechanical", description: "Incorrect Wattage", fileid: null},
]


export default {
  permitTypes,
  permits,
  findings
}
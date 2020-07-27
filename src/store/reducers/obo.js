import {
  SET_PERMIT_TYPES,
  SET_PERMITS,
  SET_PERMIT,
  UPDATE_PERMIT,
  SET_FINDINGS,
  SET_FINDING,
  ADD_FINDING,
} from "../actions/obo";

const initialState = {
  permitTypes: [],
  permits: [],
  permit: null,
  findings: [],
  finding: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERMIT_TYPES:
      return { ...state, permitTypes: action.permitTypes };
      break;

    case SET_PERMITS:
      return { ...state, permits: action.permits, permit: null, finding: null };
      break;

    case SET_PERMIT:
      const idx = state.permits.findIndex(
        (permit) => permit.objid === action.permit.objid
      );
      const updatedPermits = [...state.permits];
      updatedPermits[idx] = action.permit;
      return {
        ...state,
        permits: updatedPermits,
        permit: action.permit,
        findings: [],
        finding: null,
      };
      break;

    case SET_FINDINGS:
      return { ...state, findings: action.findings };
      break;

    case SET_FINDING:
      return { ...state, finding: action.finding };
      break;

    case ADD_FINDING:
      const updatedFindings = [...state.findings];
      updatedFindings.push(action.finding);
      const updatedPermit = { ...state.permit };
      updatedPermit.findings.forEach((finding) => {
        if (finding.type === action.finding.type) {
          finding.count += 1;
        }
      });
      return {
        ...state,
        permit: updatedPermit,
        findings: updatedFindings,
        finding: action.finding,
      };
      break;

    default:
      return state;
  }
};

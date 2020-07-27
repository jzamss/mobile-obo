import {
  SET_PERMIT_TYPES,
  SET_PERMITS,
  SET_PERMIT,
  UPDATE_PERMIT,
  SET_FINDINGS,
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
      return { ...state, permit: action.permit, finding: null };
      break;

    case SET_FINDINGS:
      return { ...state, findings: action.findings };
      break;

    // case SET_ACCOUNT:
    //   const acctIdx = state.accounts.findIndex(acct => acct.objid === action.account.objid);
    //   const updatedAccounts = [...state.accounts];
    //   updatedAccounts[acctIdx] = action.account;
    //   return { accounts: updatedAccounts, account: action.account };
    //   break;

    default:
      return state;
  }
};

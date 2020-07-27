import { SET_PERMIT_TYPES, SET_PERMITS, SET_PERMIT, UPDATE_PERMIT } from "../actions/obo";

const initialState = {
  permitTypes: [],
  permits: [],
  permit: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERMIT_TYPES:
      return { ...state, permitTypes: action.permitTypes };
      break;

    case SET_PERMITS:
      return { ...state, permits: action.permits };
      break;

    case SET_PERMIT:
      return { ...state, permit: action.permit };
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

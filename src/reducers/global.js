const initState = {
  userInfo: {}
};

export const global = (state = initState, action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        userInfo: action.userInfo
      };
    default:
      return state;
  }
};

export const receiveCurrentUser = (response) => ({
  type: 'CURRENT_USER',
  userInfo: response
});

export const getUserInfo = () => async (dispatch, getState) => {
  try {
    const response = await window.HWH5.userInfo().then((data)=> data);
    await dispatch(receiveCurrentUser(response));
    return response;
  } catch (error) {
    console.log('error: ', error);
    return error;
  }
};

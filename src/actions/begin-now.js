export const BEGIN_NOW = 'BEGIN_NOW';
export const beginNow = ()  => ({
  type: BEGIN_NOW
});

export const beginApp = () => (dispatch) => {
  dispatch(beginNow());
}
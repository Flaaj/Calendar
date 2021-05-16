export const setFocusWeek = dispatch => (week) => () => {
    dispatch({
        type: "week/focus",
        payload: week
    })
}
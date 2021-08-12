export const getField = (state, field) => state.auth.form[field];
export const getUserField = (state, field) => state.auth.userform[field];
export const getAuthField = (state, field) => state.auth[field];
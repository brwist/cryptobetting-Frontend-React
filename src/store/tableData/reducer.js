export const SET_DATA = 'setData'

const initialState = {
    data: {}
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            };
    }
    return state;
}
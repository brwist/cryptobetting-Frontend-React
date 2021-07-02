export const SET_DATA = 'setData'
export const SET_PRICE = 'setPrice'

const initialState = {
    data: {},price:''
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.payload
            };
        case SET_PRICE:
                return {
                    ...state,
                    price: action.payload
                };
    }
    return state;
}
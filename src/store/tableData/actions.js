import { SET_PRICE } from "./reducer";
import { SET_DATA } from "./reducer";

export const setSocketData = (price,expiries,expTime) => {
    return (dispatch, getState) => {
        const store = getState();
        let tableData = store.tableData.tableData
        if(expiries===undefined)
        {
            tableData = {
                ...tableData,
                price,expiries,expTime
                
            }
            dispatch({ type: SET_PRICE, payload: tableData })

        }
        else
        {
            tableData = {
                ...tableData,
                price,expiries,expTime
                
            }
            dispatch({ type: SET_DATA, payload: tableData })

        }
        
        
        }
}
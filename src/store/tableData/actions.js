import { SET_PRICE } from "./reducer";
import { SET_DATA } from "./reducer";

export const setSocketData = (price,rake_over,rake_under,expiries) => {
    return (dispatch, getState) => {
        const store = getState();
        let tableData = store.tableData.tableData
        if(rake_over===undefined)
        {
            tableData = {
                ...tableData,
                price,rake_over,rake_under,expiries
                
            }
            dispatch({ type: SET_PRICE, payload: tableData })

        }
        else
        {
            tableData = {
                ...tableData,
                price,rake_over,rake_under,expiries
                
            }
            dispatch({ type: SET_DATA, payload: tableData })

        }
        
        
        }
}
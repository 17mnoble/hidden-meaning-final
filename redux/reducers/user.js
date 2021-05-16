import { USER_STATE_CHANGE, USER_ENTRY_CHANGE } from "../constants"

//sets the current user as null
const initialState = {
    currentUser: null,
    entry: []
}

//actions will send database data to the reducers to update the state
//reducers start the state and update it whenever they receive an action
//The switch is in place to change out the USER_STATE_CHANGE and USER_ENTRY_CHANGE on an as needed basis
export const user = (state = initialState, action) => {
    switch(action.type){
        case USER_STATE_CHANGE:
            return{
                ...state, 
                currentUser: action.currentUser
            }
         case USER_ENTRY_CHANGE:
               return{
                ...state, 
                entry: action.entry
            }
            default:
                return state;
    }

    
}
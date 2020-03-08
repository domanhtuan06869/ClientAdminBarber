import { combineReducers} from "redux";
import reducerTeam from '../store/reducerTeam'
import reducerStyle from '../store/reducerNews'
import reducerStore from '../store/reducerStore';
const combine=combineReducers({
    reducerTeam:reducerTeam,
    reducerStyle:reducerStyle,
    reducerStore:reducerStore



})
  

  export default combine;
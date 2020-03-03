import { combineReducers} from "redux";
import reducerTeam from '../store/reducerTeam'
import reducerNews from '../store/reducerNews'
import reducerSlider from '../store/reducerSlider'
const combine=combineReducers({
    reducerTeam:reducerTeam,
    reducerNews:reducerNews,
    reducerSlider:reducerSlider



})
  

  export default combine;
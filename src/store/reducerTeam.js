const data={
  data:[]
}

function reducerTeam(state=data, action) {
    switch (action.type) {
      case "FETCH_TEAM":
        return {
          ...state.data,
          data:action.data||[]
        };
      default:
        return  state;
    }
  }
  
  export default reducerTeam;
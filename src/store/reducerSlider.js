const data={
    data:[]
  }
  
  function reducerSlider(state=data, action) {
      switch (action.type) {
        case "FETCH_SLIDER":
          return {
            ...state.data,
            data:action.data||[]
          };
        default:
          return  state;
      }
    }
    
    export default reducerSlider
const data={
  data:[]
}
function reducerNews(state=data, action) {
    switch (action.type) {
      case "FETCH_NEWS":
        return {
          ...state,
          data:action.data||[]
        };
      default:
        return  state;
    }
  }
  
  export default reducerNews;
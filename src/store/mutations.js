import * as types from "./mutation-types";

export default {   
  [types.STAtE_ROUTER](state,res){
    state.state_router=res
  },
  [types.SAVE_USERID](state,{userid}){
   state.userid=userid
   localStorage.setItem('userid',userid)
  },
  [types.SAVE_DEVICEInfO](state,{deviceinfo}){
   state.deviceinfo=deviceinfo
  },
  [types.SAVE_DATA](state,{params}){
    state.val=params
  },
  [types.SAVE_DATAL](state,{params}){
    state.hideheaderaside=params
  },
  [types.SAVE_EDITABLETABS2](state,res){
    state.editableTabs2 = res;
    localStorage.setItem('editableTabs2', JSON.stringify(state.editableTabs2));
  },
  [types.SAVE_EDITABLETABS3](state,res){
    state.Savearray = res;
    localStorage.setItem('Savearray', JSON.stringify(state.Savearray));
  },
}

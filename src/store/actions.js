import * as types from "./mutation-types";
export default {
  async stateRouter({commit},payload){
    commit(types.STAtE_ROUTER,payload)
  },
  async saveUserid({commit},userid){
      commit(types.SAVE_USERID,{userid})
  },
  async saveDevice({commit},deviceinfo){
      commit(types.SAVE_DEVICEInfO,{deviceinfo})
  },
  async saveData({commit},params){
    commit(types.SAVE_DATA,{params})
  },
 saveEditableTabs2({commit},params){
    commit(types.SAVE_EDITABLETABS2,{params})
  },
  
}


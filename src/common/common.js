export default {
	//校验非空
	isempty(val,name,type,vm){
		if(val==null||val==""||val==undefined){
       		vm.$message({
				message:name,
				duration:'1500',
				type: type
			});
			return false;
       	}else{
       		return true;
       	}
	},
	
}
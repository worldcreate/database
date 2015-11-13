var AddedData=function(Parser){
	this.data={"table":"rent"};
	this.count=0;

	if(Parser==null)
		return;
}

AddedData.s_stringId=[
	"name","evaluation","cost","deposit",
	"reward","prefecture",
	"city","ward","address",
	"toSumi","toHigo","pair",
	"bath_wc","balcony","two_stove",
	"bicycles","merit","demerit",
	"other","url"
];

AddedData.s_ableNull=[
	false,true,false,false,
	false,false,
	false,true,false,
	false,false,true,
	true,true,true,
	true,true,true,
	true,false
];

AddedData.s_paramType=[
	"String","Int","String","String",
	"String","String",
	"String","String","String",
	"Int","Int","Int",
	"Int","Int","Int",
	"Int","String","String",
	"String","String"
];

AddedData.s_selectId=["","","","",
	"","prefecture","city","ward","",
	"","","",
	"","","",
	"","","",
	"",""
];

AddedData.prototype.addData=function(key,value){
	var index=-1;
	for(var i=0;i<this.stringId.length;i++){
		if(key===this.stringId[i]){
			index=i;
			break;
		}
	}
	this.data[key]=value+","+this.paramType[index];
	this.count++;
}

AddedData.prototype.setName=function(name){
	this.data['name']=name;
}

AddedData.prototype.length=function(){
	return this.count;
}

AddedData.prototype.getData=function(){
	return this.data;
}
var AddedData=function(Parser){
	if(Parser==null)
		return;
	this.data={"table":"rent"};

	this.stringId=[
		"name","evaluation","cost","deposit",
		"reward","prefecture",
		"city","ward","address",
		"toSumi","toHigo","pair",
		"bath_wc","balcony","two_stove",
		"bicycles","merit","demerit",
		"other","url"
	];

	this.ableNull=[
		false,true,false,false,
		false,false,
		false,true,false,
		false,false,true,
		true,true,true,
		true,true,true,
		true,false
	];

	this.paramType=[
		"String","Int","String","String",
		"String","String",
		"String","String","String",
		"Int","Int","Int",
		"Int","Int","Int",
		"Int","String","String",
		"String","String"
	];

	this.selectId=["","","","",
		"","prefecture","city","ward","",
		"","","",
		"","","",
		"","","",
		"",""
	];

	this.count=0;
}

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
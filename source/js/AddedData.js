var AddedData=function(){
	this.data={"table":"rent"};
	this.count=0;
};

AddedData.s_ID={
	NAME:0,
	EVAL:1,
	COST:2,
	REICOST:3,
	SHIKICOST:4,
	PREFECTURE:5,
	CITY:6,
	WARD:7,
	ADDRESS:8,
	TOSUMI:9,
	TOHIGO:10,
	PAIR:11,
	BATH_WC:12,
	BALCONY:13,
	TWO_STOVE:14,
	BICYCLES:15,
	MERIT:16,
	DEMERIT:17,
	OTHER:18,
	URL:19
};

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
	for(var i=0;i<AddedData.s_stringId.length;i++){
		if(key.indexOf(AddedData.s_stringId[i])!=-1){
			index=i;
			break;
		}
	}
	this.data[key]=value+","+AddedData.s_paramType[index];
	this.count++;
};

AddedData.prototype.length=function(){
	return this.count;
};

AddedData.prototype.getData=function(){
	return this.data;
};
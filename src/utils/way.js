const method = {
    timer(){
        let str = ""
        let date = new Date();
        let year = date.getFullYear();
        let mouth = date.getMonth();
        let day = date.getDate();
        str = year + "/" + mouth +"/" +day
        return str
    },
    getcookie(key){//获取cookie
        var xxx=document.cookie;
        var oDate=new Date();
        oDate.setDate(oDate.getDate()+30);
        var result=[];
        var oName=[];
        var oValue=[];
        var rua_2=xxx.split(";");
        for(var i=0;i<rua_2.length;i++){
            result.push(rua_2[i].split("="))
        }
        for(var j=0;j<result.length;j++){
            oName.push(result[j][0]);
            oValue.push(result[j][1]);
        }
        for(var k=0;k<oName.length;k++){
            oName[k]=oName[k].replace(" ","");
        }
        for(var z=0;z<oName.length;z++){
            if(oName[z]===key){
                return [oName[z],oValue[z]];
            }
        }
    },
    setcookie(key,value,time){//设置cookie
        var date=new Date();
        date.setDate(date.getDate()+time);
        document.cookie=`${key}=${value};expires=`+date;
    }
}
export default method;
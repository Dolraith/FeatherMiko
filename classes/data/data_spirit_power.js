/* global global */
Data_Class = require(global.classPaths.data_super);
class Data_Spirit_Power extends Data_Class{
    constructor(){
        super();
        this.table = "miko_power";
        this.fields({
            name:"",
            type:"",
            action:"",
            power_range:"",
            descript:"",
            duration:"",
            source:""
        });
    }
}

module.exports = Data_Spirit_Power;
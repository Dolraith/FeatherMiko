/* global global */
Data_Class = require(global.classPaths.data_super);
class Data_Spirit_Skill extends Data_Class{
    constructor(){
        super();
        this.table = "miko_skill";
        this.fields({
            name:"",
            attribute:""
        });
    }
}

module.exports = Data_Spirit_Skill;
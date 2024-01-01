/* global global */
Data_Class = require(global.classPaths.data_super);
class Data_Spirit_Type extends Data_Class{
    constructor(){
        super();
        this.table = "miko_spirit_type";
        this.fields({
            type:"",
            element:"",
            body:0,
            agility:0,
            reaction:0,
            strength:0,
            willpower:0,
            logic:0,
            intuition:0,
            charisma:0,
            magic:0,
            phys_init:"",
            astral_init:"",
            source:"",
            special:"",
            weakness:''
        });
    }
}

module.exports = Data_Spirit_Type;
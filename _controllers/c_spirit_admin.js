/* global global */
Data_User = require(global.classPaths.data.core.user);
Controller = require(global.classPaths.controller);
Data_Factory = require(global.classPaths.data_factory);
DataSpiritType = require(global.classPaths.data.miko.type);
DataSpiritSkill = require(global.classPaths.data.miko.skill);
DataSpiritPower = require(global.classPaths.data.miko.power);
SQL = require(global.classPaths.sql);

class CIndex extends Controller {
    async index(){
        //do this with a proper permission required thing.
        if(!await this.checkLogin()){
            this.setRedirect("/err/err403");
            return;
        }
        this.setView('modules/Miko/_views/v_spirit_admin');
        this.setViewData("user",await this.getUserId());
                
        var spirit_types = await (new Data_Factory(DataSpiritType).many_query(null,true));
        var spirit_powers = await (new Data_Factory(DataSpiritPower).many_query(null,true));
        var spirit_skills = await (new Data_Factory(DataSpiritSkill).many_query(null,true));

        var spirit_skill_map = await SQL.load("SELECT * FROM miko_map_types_skills");

        var skillmap = {active:null};
        var powermap = {active:null};

        for(row in spirit_types){
            var type = spirit_types[row]["_id"];
            skillmap[type] = {changed:false};
            powermap[type] = {changed:false};
        }

        for(var row in spirit_skill_map){
            var cur = spirit_skill_map[row];
            var type = cur["spirit_types_id"];
            var skill = cur["spirit_skills_id"];
            var active = cur["active"]===1;
            skillmap[type][skill] = active;
        }


        var spirit_power_map = await SQL.load("SELECT * FROM miko_map_types_powers");
        for(var row in spirit_power_map){
            var cur = spirit_power_map[row];
            var type = cur["spirit_types_id"];
            var power = cur["spirit_powers_id"];
            var required = cur['required'];
            var notes = cur['notes'];
            if(notes === undefined || notes === null)notes = '';
            powermap[type][power] = {required:required,notes:notes};
        }

        //this.setViewData("user",user.getData());
        this.setViewData("skillmap",skillmap);
        this.setViewData("powermap",powermap);
        this.setViewData("spirit_types",spirit_types);
        this.setViewData("spirit_powers",spirit_powers);
        this.setViewData("spirit_skills",spirit_skills);
    }


    async removeType(){this.setView({message:"Please Implement Me"});}
    async removePower(){
        var id = this._request.body.power._id;

        var query = "DELETE FROM spirit_power WHERE _id = " + id;

        var rows = await SQL.save(query);
        this.setView({success:true, message:"Affected rows: " + rows.affectedRows});
    }
    async removeSkill(){this.setView({message:"Please Implement Me"});}
    async saveType(){
        var sentType = this._request.body.type;
        var spiritType;
        if(sentType._id !== null){
            spiritType = await DataSpiritType.id(sentType._id);
        }else{
            spiritType = DataSpiritType.make();
        }
        spiritType.inflate(sentType);
        var resultId = await spiritType.save();
        this.setView({message:"Saved!", success:true, _id:resultId});
    }
    async savePower(){
        var sentPower = this._request.body.power;
        var spiritPower;
        if(sentPower._id !== null){
            spiritPower = await DataSpiritPower.id(sentPower._id);
        }else{
            spiritPower = DataSpiritPower.make();
        }
        spiritPower.inflate(sentPower);
        var resultId = await spiritPower.save();
        this.setView({message:"Saved!", success:true, _id:resultId});
    }
    async saveSkill(){
        var sentSkill = this._request.body.skill;
        var spiritSkill;
        if(sentSkill._id !== null){
            spiritSkill = await DataSpiritSkill.id(sentSkill._id);
        }else{
            spiritSkill = DataSpiritSkill.make();
        }
        spiritSkill.inflate(sentSkill);
        var resultId = await spiritSkill.save();
        this.setView({message:"Saved!", success:true, _id:resultId});
    }
    async saveSkillMap(){
        var typeId = this._request.body.type_id;
        var map = this._request.body.map;

        var query = "INSERT INTO spirit_map_types_skills (spirit_types_id,spirit_skills_id,active) VALUES ";
        var queryPieces = [];
        for(var i in map){
            if(i === "changed")continue;
            queryPieces.push("(" +typeId + "," + i + ","+(map[i]|0)+")");
        }
        query += queryPieces.join(",");
        query += " ON DUPLICATE KEY UPDATE active = VALUES(active)";
        var rows = await SQL.load(query,function(){});
        this.setView({success:true, message:"Saved skill map for "+typeId+"."});
    }
    async savePowerMap(){
        var typeId = this._request.body.type_id;
        var map = this._request.body.map;

        var query = "INSERT INTO spirit_map_types_powers (spirit_types_id,spirit_powers_id,required,notes) VALUES ";
        var queryPieces = [];
        for(var i in map){
            if(i === "changed")continue;
            queryPieces.push("(" + typeId + ", " + i + ", '" + map[i].required + "', '" + map[i].notes+ "')");
        }
        query += queryPieces.join(",");
        query += " ON DUPLICATE KEY UPDATE required = VALUES(required), notes = VALUES(notes)";
        var rows = await SQL.load(query, function(){});
        this.setView({success:true, message:"Saved power map for "+typeId+"."});
    }
};
module.exports=CIndex


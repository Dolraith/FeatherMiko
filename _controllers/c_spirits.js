/* global global */
Controller = require(global.classPaths.controller);
Data_Factory = require(global.classPaths.data_factory);
DataSpiritType = require(global.classPaths.data.miko.type);
DataSpiritSkill = require(global.classPaths.data.miko.skill);
DataSpiritPower = require(global.classPaths.data.miko.power);
SQL = require(global.classPaths.sql);

class CIndex extends Controller {
    async index(){        
        var spirit_types = await (new Data_Factory(DataSpiritType).many_query(null,true));
        var spirit_powers = await (new Data_Factory(DataSpiritPower).many_query(null,true));
        var spirit_skills = await (new Data_Factory(DataSpiritSkill).many_query(null,true));

        var spirit_skill_map = await SQL.load("SELECT * FROM miko_map_types_skills WHERE active = 1");
        var skillmap = {};
        var powermap = {};

        for(row in spirit_types){
            var type = spirit_types[row]["_id"];
            skillmap[type] = {};
            powermap[type] = {};
        }

        for(var row in spirit_skill_map){
            var cur = spirit_skill_map[row];
            var type = cur["spirit_types_id"];
            var skill = cur["spirit_skills_id"];
            var active = cur["active"] === 1;
            skillmap[type][skill] = active;
        }


        var spirit_power_map = await SQL.load("SELECT * FROM miko_map_types_powers");
        for(var row in spirit_power_map){
            var cur = spirit_power_map[row];
            var type = cur["spirit_types_id"];
            var power = cur["spirit_powers_id"];
            var required = cur['required'];
            var notes = cur['notes'];
            if(notes === undefined)notes = '';
            powermap[type][power] = {required:required,notes:notes};
        }

        this.setViewData("skillmap",skillmap);
        this.setViewData("powermap",powermap);
        this.setViewData("spirit_types",spirit_types);
        this.setViewData("spirit_powers",spirit_powers);
        this.setViewData("spirit_skills",spirit_skills);

        this.setView('modules/Miko/_views/v_spirits');
    }
};
module.exports=CIndex;
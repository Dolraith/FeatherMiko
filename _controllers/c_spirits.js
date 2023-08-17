/* global global */
var Controller = require(global.classPaths.controller);
var DataSpiritType = require(global.classPaths.data.spirits.type);
var DataSpiritSkill = require(global.classPaths.data.spirits.skill);
var DataSpiritPower = require(global.classPaths.data.spirits.power);
var SQL = require(global.classPaths.sql);

class CIndex extends Controller {
    async index(){
        var spirit_types = await DataSpiritType.many_query(null,true);
        var spirit_powers = await DataSpiritPower.many_query(null,true);
        var spirit_skills = await DataSpiritSkill.many_query(null,true);

        var spirit_skill_map = await SQL.load("SELECT * FROM spirit_map_types_skills WHERE active = 1")
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
            var active = cur["active"]==1;
            skillmap[type][skill] = active;
        }


        var spirit_power_map = await SQL.load("SELECT * FROM spirit_map_types_powers");
        for(var row in spirit_power_map){
            var cur = spirit_power_map[row];
            var type = cur["spirit_types_id"];
            var power = cur["spirit_powers_id"];
            var required = cur['required'];
            var notes = cur['notes'];
            if(notes == undefined)notes = '';
            powermap[type][power] = {required:required,notes:notes};
        }

        this.setViewData("skillmap",skillmap);
        this.setViewData("powermap",powermap);
        this.setViewData("spirit_types",spirit_types);
        this.setViewData("spirit_powers",spirit_powers);
        this.setViewData("spirit_skills",spirit_skills);

        this.setView('modules/feather_core/default/spirits/_views/v_spirits');
    }
};
module.exports=CIndex
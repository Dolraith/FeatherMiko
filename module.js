/* global global */

global._permissions.addPermissions([
    {name:"miko_admin",label:"Miko Admin",module:"Miko"}
]);


global.classPaths.data.miko = {
    type:  global.server_root + "/modules/Miko/classes/data/data_spirit_type",
    power: global.server_root + "/modules/Miko/classes/data/data_spirit_power",
    skill: global.server_root + "/modules/Miko/classes/data/data_spirit_skill"
};
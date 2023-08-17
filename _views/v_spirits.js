const View = require(global.classPaths.view);
class v_index extends View{
    init(){
        this.addDependency('bootstrap');
        this.addDependency([{name:'vue',path:'/modules/feather_core/default/spirits/_js/j_spirits.js'}],'modules');
        this.addDependency('vue');
        this.addComponent('Counter');
        this.setTemplate('modules/feather_core/default/spirits/_templates/t_spirits.html');

        this.setVueData("skillmap",this.getDataProp("skillmap"));
        this.setVueData("powermap",this.getDataProp("powermap"));
        this.setVueData("spirit_types",this.getDataProp("spirit_types"));
        this.setVueData("spirit_powers",this.getDataProp("spirit_powers"));
        this.setVueData("spirit_skills",this.getDataProp("spirit_skills"));
    }    
}
module.exports = v_index;
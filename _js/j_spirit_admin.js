import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
export function initVue(initData, components){    
    var vue = createApp({
        data(){
            var data = {
                tab:'types',
                attributes:[
                    "Body",
                    "Agility",
                    "Reaction",
                    "Strength",
                    "Willpower",
                    "Logic",
                    "Intuition",
                    "Charisma",
                    "Magic"
                ],
            };
            for(i in initData){
                data[i] = initData[i];
            }
            console.log(data);
            return data;
        },
        template:"#vuetemplate",
        methods:{
            addType(){
                this.spirit_types.push({
                    _id:null,
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
            },
            addPower(){
                this.spirit_powers.push({
                    _id:null,
                    name:"",
                    type:"P",
                    action:"",
                    power_range:"",
                    duration:"",
                    descript:"",
                    source:""
                })
            },
            addSkill(){
                this.spirit_skills.push({
                    _id:null,
                    name:"",
                    attribute:""
                })
            },

            async removeType(index){
                if(this.spirit_types[index]._id != null){
                    const request = new Request("spirit_admin/removeType",
                    {
                        method: "POST",
                        headers: new Headers({'content-type': 'application/json'}),
                        cache: "default",
                        body: JSON.stringify({type:this.spirit_types[index]})
                    });
                    var data = await fetch(request).then((response) => response.json());
                    console.log(data);
                }
                this.spirit_types.splice(index,1);
            },
            async removePower(index){
                if(this.spirit_powers[index]._id != null){
                    const request = new Request("spirit_admin/removePower",
                    {
                        method: "POST",
                        headers: new Headers({'content-type': 'application/json'}),
                        cache: "default",
                        body: JSON.stringify({power:this.spirit_powers[index]})
                    });
                    var data = await fetch(request).then((response) => response.json());
                    console.log(data);
                }
                this.spirit_powers.splice(index,1);
            },
            async removeSkill(index){
                if(this.spirit_skills[index]._id != null){
                    const request = new Request("spirit_admin/removeSkill",
                    {
                        method: "POST",
                        headers: new Headers({'content-type': 'application/json'}),
                        cache: "default",
                        body: JSON.stringify({skill:this.spirit_skills[index]})
                    });
                    var data = await fetch(request).then((response) => response.json());
                    console.log(data);
                }
                this.spirit_skills.splice(index,1);
            },
            async saveType(index){
                console.log(this.spirit_types[index]);
                const request = new Request("spirit_admin/saveType",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: JSON.stringify({type:this.spirit_types[index]})
                });
                var data = await fetch(request).then((response) => response.json());
                if(this.spirit_types[index]._id == null)this.spirit_types[index]._id = data._id;
                console.log(data);
            },
            async savePower(index){
                const request = new Request("spirit_admin/savePower",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: JSON.stringify({power:this.spirit_powers[index]})
                });
                var data = await fetch(request).then((response) => response.json());
                this.spirit_powers[index]._id = data._id;
                console.log(data);
            },
            async saveSkill(index){
                const request = new Request("spirit_admin/saveSkill",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: JSON.stringify({skill:this.spirit_skills[index]})
                });
                var data = await fetch(request).then((response) => response.json());
                this.spirit_skills[index]._id = data._id;
                console.log(data);
            },
            checkForNulls(){
                var alertText = null;
                for(var type in this.spirit_types){
                    if(this.spirit_types[type]._id == null){
                        alertText = "There's null ids in types, save your stuff first.";
                    }
                }
                for(var skill in this.spirit_skills){
                    if(this.spirit_skills[skill]._id == null){
                        alertText = "There's null ids in skills, save your stuff first.";
                    }
                }
                for(var power in this.spirit_powers){
                    if(this.spirit_powers[power]._id == null){
                        alertText = "There's null ids in powers, save your stuff first.";
                    }
                }
                if(alertText != null){
                    this.tab = 'types';
                    alert(alertText);
                }
            },
            map_skill(type_id, skill_id){
                this.skillmap[type_id].changed = true;
                console.log(type_id + " -> " + skill_id + " = " + this.skillmap[type_id][skill_id]);
            },
            map_power(type_id, power_id){
                this.powermap[type_id].changed = true;
                console.log(type_id + " --> " + power_id + " = " + this.powermap[type_id][power_id]);
            },
            async map_skill_save(){
                this.skillmap[this.skillmap.active].changed = false;
                const request = new Request("spirit_admin/saveSkillMap",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: JSON.stringify({type_id:this.skillmap.active,map:this.skillmap[this.skillmap.active]})
                });
                var data = await fetch(request).then((response) => response.json());
                console.log(data);
            },
            async map_power_save(){
                this.powermap[this.powermap.active].changed = false;
                const request = new Request("spirit_admin/savePowerMap",
                {
                    method: "POST",
                    headers: new Headers({'content-type': 'application/json'}),
                    cache: "default",
                    body: JSON.stringify({type_id:this.powermap.active,map:this.powermap[this.powermap.active]})
                });
                var data = await fetch(request).then((response) => response.json());
                console.log(data);
            },
            activatePowermap(typeId){
                for(var i in this.spirit_powers){
                    var powerId = this.spirit_powers[i]._id;
                    if(this.powermap[typeId][powerId] == undefined){
                        this.powermap[typeId][powerId] = {required:'none',notes:''}
                    }
                }
                this.powermap.active = typeId;
            }
        }
    });
    for(var i in components){
        vue.component(i, components[i]);
    }
    vue.mount('#vuemain');
    window.vue = vue;
}
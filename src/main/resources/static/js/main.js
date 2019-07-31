var api = Vue.resource('/cars{/id}');
var apiR = Vue.resource('/registration');
var apiFilter = Vue.resource('/filter{/description}')

function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}

Vue.component('car-form',{
    props:['cars','item'],
    data: function(){
        return{
            id:'',
            model:'',
            mileage:null,
            yearOfIssue:null,
            phone:'',
            address:'',
            master:'',
            description:''
        }
    },
    template:
    '<div>' +
        '<tr>' +
            '<input type="text" placeholder="model" v-model="model" /><br/>' +
            '<input type="number" placeholder="mileage" v-model="mileage" /><br/>' +
            '<input type="date" value="2013-01-08" placeholder="yearOfIssue" v-model="yearOfIssue" /><br/>' +
            '<input type="text" placeholder="write" v-model="description" /><br/>' +
            '<input type="text" placeholder="phone" v-model="phone" /><br/>' +
            '<input type="text" placeholder="address" v-model="address" /><br/>' +
            '<input type="text" placeholder="master" v-model="master" /><br/>' +
            '<input type="button" class="btn btn-primary" value="save" @click="save"/>' +
        '</tr>' +
    '</div>',
    methods:{
        save(){
            var text = {
                description:this.description,
                yearOfIssue:this.yearOfIssue,
                phone:this.phone,
                address:this.address,
                master:this.master,
                model:this.model,
                mileage:this.mileage
            };
            if (this.id){
                api.update({id:this.id},text).then(res=>{
                    res.json().then(data=>{
                        var index = getIndex(this.cars, data.id);
                        this.cars.splice(index, 1, data);
                    })
                });
            } else{
                api.save({},text).then(res=>res.json().then(data=>{
                    this.cars.push(data);
                }));
            }
            this.description = '';
            this.id = '';
            this.yearOfIssue=null;
            this.phone='';
            this.address='';
            this.master='';
            this.model='';
            this.mileage=null;
        }
    },
    watch:{
        item:function(newVal,oldVal){
            this.description = newVal.description;
            this.id = newVal.id;
            this.yearOfIssue=newVal.yearOfIssue;
            this.phone=newVal.phone;
            this.address=newVal.address;
            this.master=newVal.master;
            this.model=newVal.model;
            this.mileage=newVal.mileage;
        }
    }
});

Vue.component('cars-row',{
    props:['item','editcars','cars'],
    data:function(){
        return{

        }
    },
    methods:{
        edit(){
            this.editcars(this.item);
        },
        del(){
            api.delete({id:this.item.id}).then(res=>{
                if (res.ok) {
                    this.cars.splice(this.cars.indexOf(this.item),1)
                }
            })
        }
    },
    template:
    '<div>' +
        '<tr>' +
            '<th class="ma">{{item.id}}</th>' +
            '<th class="ma">{{item.yearOfIssue}}</th>' +
            '<th class="ma">{{item.phone}}</th>' +
            '<th class="ma">{{item.address}}</th>' +
            '<th class="ma">{{item.master}}</th>' +
            '<th class="ma">{{item.model}}</th>' +
            '<th class="ma">{{item.mileage}}</th>' +
            '<th class="ma">{{item.description}}</th>' +
            '<th class="ma">' +
                '<input type="button" class="btn btn-primary" value="edit" @click="edit">' +
                '<input type="button" class="btn btn-primary" value="delete" @click="del">' +
            '</th>' +
        '</tr>'+
    '</div>'
});

// Vue.component('registration',{
//     data:function(){
//         return{
//             username:"",
//             password:""
//         }
//     },
//     template:
//     '<div>' +
//     '<h1>regist</h1>' +
//         '<input type="text" name="username" placeholder="username" v-model="username"/>' +
//         '<input type="text" name="password" placeholder="password" v-model="password"/>' +
//         '<input type="button" value="submit" @click="reg">' +
//     '</div>',
//     methods:{
//         reg(){
//             var user = {
//               username:this.username,
//               password:this.password
//             };
//             apiR.save({},user).then(res=>console.log(res));
//         }
//     }
// });

// Vue.component('login',{
//     data:function(){
//         return{
//             username:"",
//             password:""
//         }
//     },
//     template:
//     '<div>' +
//         // '<for action="/login" method="post">' +
//         '<h1>login</h1>' +
//         '<input type="text" name="username" placeholder="username" v-model="username"/>' +
//         '<input type="text" name="password" placeholder="password" v-model="password"/>' +
//         '<input type="button" value="submit" @click="log">' +
//     '</div>',
//     methods:{
//         log(){
//             var user = {
//                 username: this.username,
//                 password: this.password
//             };
//             Vue.http.post('/login',user).then(res => console.log(res));
//         }
//     }
// });

Vue.component('navbar',{
    props:['profile','isAdminProfile'],
    template:
        '<div>' +
            '<nav class="navbar navbar-light bg-dark">' +
                '<a v-if="profile" style="color:white" href="/logout">{{profile.username}}({{profile.authorities.toString()}}) logout</a>' +
                '<a href="/admin" v-if="isAdminProfile" style="color:white"> administration page</a>'+
            '</nav>' +
        '</div>'
});
var app = new Vue({
    el: '#app',
    data: {
        cars:[],
        item:'',
        profile:null,
        isAdminProfile:false,
        description:'',
        findList:[],
        switcher:false
    },
    methods:{
        editcars(item){
            this.item = item;
        },
        search(){
            console.log(this.description);
            if (this.description==='') {
                this.switcher=false;
            }else{
                this.switcher = true;
                this.findList = [];
                apiFilter.get({description:this.description}).then(res => {
                    console.log(res);
                    res.json().then(data=>data.forEach(car=>this.findList.push(car)));
                }, response => {
                    console.log("fatal")
                });
            }
        }
    },
    template:
    '<div>' +
        '<navbar :profile="profile" :isAdminProfile="isAdminProfile"></navbar>' +
        '<div class="container">' +
            '<div v-if="!profile">' +
                '<a href="/login">  login</a>' +
            '</div>' +
            '<div v-else>' +
                '<car-form :cars = "cars" :item="item"></car-form>' +
                '<input type="text" v-model="description">' +
                '<input type="button" value="search" @click="search">' +

                '<div>' +
                    // '<table class="ma">' +
                    '<tr>' +
                    '<th class="ma">id</th>' +
                    '<th class="ma">yearOfIssue</th>' +
                    '<th class="ma">phone</th>' +
                    '<th class="ma">address</th>' +
                    '<th class="ma">master</th>' +
                    '<th class="ma">model</th>' +
                    '<th class="ma">mileage</th>' +
                    '<th class="ma">description</th>' +
                    '<th class="ma">but</th>' +
                    '</tr>' +
                    '<cars-row v-if="switcher" v-for="item in findList" v-bind:key="item.id" :item="item" :editcars="editcars" :cars="findList"/>' +
                    '<cars-row v-else v-for="item in cars" v-bind:key="item.id" :item="item" :editcars="editcars" :cars="cars"/>' +
                    // '</table>' +
                '</div>' +
            '</div>' +
        '</div>'+
    '</div>',
    created(){
        try {
            this.cars=frontendData.cars;
            this.profile = frontendData.profile;
            this.isAdminProfile = frontendData.profile.authorities.toString().indexOf("ADMIN")>=0;
        }catch (e) {
            console.log(e);
        }

    }
});


function generateApp() {
    for (var i = 0; i < 20; i++) {
        fetch('/cars',{method:'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify({
                description:"description - 1"+i,
                yearOfIssue:null,
                phone:'123123'+i,
                address:'123123'+i,
                master:'123123'+i,
                model:'123123'+i,
                mileage:123123+i
            })}).then(res=>console.log(i));
    }

}
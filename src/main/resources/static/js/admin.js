var admin = Vue.resource('admin{/id}');

function getindex(list, id) {
    for (var i = 0; i < list.length; i++) {
        if (list[i].id === id) {
            return i
        }
    }
    return -1;
}
//
// Vue.component('user-form', {
//     props: ['users', 'userAttr'],
//     data: function () {
//         return {
//             user: '',
//             date: null,
//             checker: true,
//             id: null
//         }
//     },
//     watch: {
//         userAttr: function (newVal, oldVal) {
//             this.user = newVal.user;
//             this.date = newVal.date;
//             this.checker = newVal.checker;
//             this.id = newVal.id;
//         }
//     },
//     template: '<div>' +
//     '<input type="text" placeholder="write your user" v-model="user">' +
//     '<input type="date" value="2013-01-08" v-model="date">' +
//     '<input type="checkbox" v-model="checker">' +
//     '<input type="button" value="Save" @click="save">' +
//     '</div>',
//     methods: {
//         save: function () {
//             var user = {user: this.user, date: this.date, checker: this.checker};
//             if (this.id) {
//                 console.log(user);
//
//                 userApi.update({id: this.id}, user).then(result =>
//                     result.json().then(data => {
//                         var index = getindex(this.users, data.id);
//                         this.users.splice(index, 1, data);
//                         console.log(data);
//                         this.user = '';
//                         this.id = '';
//                         this.date = '';
//                     })
//                 )
//             } else {
//                 userApi.save({}, user).then(result => result.json().then(data => {
//                         this.users.push(data);
//                         this.user = '';
//                         this.id = '';
//                         this.date = '';
//                     }
//                 ))
//             }
//         }
//     }
// });


Vue.component('user-row', {
    props: ['user','profile'],
    data:function () {
        return{
            username:'',
            isAdmin:this.user.authorities.indexOf("ADMIN")>=0,
            isActive: this.user.active
        }
    },
    template:
    '<div>' +
        '<b>{{user.id}}</b>{{user.username}} ' +
        '<span v-if="user.username!==profile.username">' +
            '<label>: Active ' +
                '<input type="checkbox" value="active" v-bind:checked="isActive" @click="updateUser"> ' +
                // '<input type="button" value="active" @click="updateUser">' +
            '</label>'+
            '<label>: Is Admin <input type="checkbox" value="Admin" v-bind:checked="isAdmin" @click="updateUser"> </label>' +
        '</span>' +
    '</div>',
    methods: {
        updateUser: function () {

            // console.log(user);
            admin.update({id: this.user.id}, {
                admin:this.user.admin,
                active:this.user.active
            }).then(result =>
                result.json().then(data => {
                    console.log("Success")
                })
            )
        }
    },
    watch: {
        isActive: function (newVal, oldVal) {
            this.isActive = newVal.isActive;
            // this.updateUser();
        },
        isAdmin: function (newVal, oldVal) {
            this.isAdmin = newVal.isActive;
            // this.updateUser();
        }
    }
});


Vue.component('users-list', {
    props: ['users','profile'],
    data: function () {
        return {
            username: '',
            id:'',
            roles:[]
        }
    },
    template:
    '<div>' +
       '<h3>List</h3>' +
        '<a href="/">home</a>' +
        '<user-row v-for="user in users" :key="user.id" :user="user" :profile="profile"/>' +
    '</div>'
});


var app = new Vue({
    el: '#admin',
    template: 
        '<div>' +
            '<users-list :users = "users" :profile="profile"></users-list>' +
        '</div>' ,

    data: {
        users: [],
        profile:null
    },
    created: function () {
        this.users = userDetails.users;
        this.profile = userDetails.profile
        // admin.get().then(result => result.json().then(data => data.forEach(user => this.users.push(user))));
    }
});
//
// function generateUsers() {
//     for (var i = 0; i < 20; i++) {
//         fetch('/registration',{method:'POST', headers:{'Content-Type':'application/json'},body:JSON.stringify({
//                 username:"description",
//                 password:1
//             })}).then(res=>console.log(res));
//     }
//
// }
var api = Vue.resource('/login');var apiR = Vue.resource('/registration');

Vue.component('login-form',{
    data:function () {
        return{
            username:'',
            password:''
        }
    },
    template:
        '<div>' +
        '<h1>login</h1>' +
        '<div><label> Name : <input type="text" name="username" v-model="username"/> </label></div>\n' +
        '    <div><label> Password: <input type="password" name="password" v-model="password"/> </label></div>\n' +
        '    <div><input type="submit" value="Sign In"/></div>' +
        '</div>'
    ,
    methods:{
        login(){
            var user = {
                username:this.username,
                password:this.password
            };
            api.get({},user).then(res=>{
                console.log(res.ok)
            });
        }
    }

});
Vue.component('reg-form',{
    data:function () {
        return{
            username:'',
            password:''
        }
    },
    template:
        '<div>' +
        '<h1>login</h1>' +
        '<div><label> Name : <input type="text" name="username" v-model="username"/> </label></div>\n' +
        '    <div><label> Password: <input type="password" name="password" v-model="password"/> </label></div>\n' +
        '    <div><input type="submit" value="Sign In"/></div>' +
        '</div>'
    ,
    methods:{
        login(){
            var user = {
                username:this.username,
                password:this.password
            };
            apiR.save({},user).then(res=>{
                console.log(res.ok)
            });
        }
    }

});
var app = new Vue({
    el: '#app',
    template:
        '<div>' +
        '<login-form></login-form>' +
        '<reg-form></reg-form>' +
        '</div>'
       ,

});
var api = Vue.resource('/cars{/id}');

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
            owner:'',
            phone:'',
            address:'',
            master:'',
            description:''
        }
    },
    template:
        '<div>' +
        '<input type="text" placeholder="model" v-model="model" />' +
        '<input type="number" placeholder="mileage" v-model="mileage" />' +
        '<input type="date" value="2013-01-08" placeholder="yearOfIssue" v-model="yearOfIssue" />' +
        '<input type="text" placeholder="write" v-model="description" />' +
        '<input type="text" placeholder="phone" v-model="phone" />' +
        '<input type="text" placeholder="address" v-model="address" />' +
        '<input type="text" placeholder="master" v-model="master" />' +
        '<input type="button" value="save" @click="save"/>' +
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
                        this.description = '';
                        this.id = '';
                    })
                });
            } else{
                api.save({},text).then(res=>res.json().then(data=>{
                    this.cars.push(data);
                }));
            }
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
            this.mileag=newVal.mileag;
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
        '<div>'+
        '{{item.id}} <i>{{item.yearOfIssue}}</i><i>{{item.phone}}</i><i>{{item.address}}</i><i>{{item.master}}</i><i>{{item.model}}</i><i>{{item.mileag}}</i>' +
        '<i>{{item.description}}</i>' +
        '<input type="button" value="edit" @click="edit">' +
        '<input type="button" value="delete" @click="del">' +
        '</div>'
});


var app = new Vue({
    el: '#app',
    template:
        '<div>' +
        '<div v-if="!profile">' +
        '<a href="/login">Login Google</a>' +
        '</div>'+
        '<div v-else>' +
        '<a href="/logout">{{profile.name}} logout</a>' +
        '<car-form :cars = "cars" :item="item"></car-form>'+
        '<cars-row v-for="item in cars" v-bind:key="item.id" :item="item" :editcars="editcars" :cars="cars">' +
        '</cars-row>' +
        '</div>' +
        '</div>',
    data: {
        cars: [],
        item:'',
        profile:frontendData.profile
    },
    methods:{
        editcars(item){
            this.item = item;
        }
    }
});
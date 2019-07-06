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
            text:'',
            id:''
        }
    },
   template:
       '<div>' +
        '<input type="text" placeholder="write" v-model="text" />' +
        '<input type="button" value="save" @click="save"/>' +
       '</div>',
    methods:{
        save(){
            var text = {description:this.text};
            if (this.id){
                api.update({id:this.id},text).then(res=>{
                    res.json().then(data=>{
                        var index = getIndex(this.cars, data.id);
                        this.cars.splice(index, 1, data);
                        this.text = '';
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
            this.text = newVal.description;
            this.id = newVal.id
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
                '{{item.id}} <i>{{item.description}}</i>' +
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
            '<cars-row v-for="item in cars" :item="item" :editcars="editcars" :cars="cars">' +
            '</cars-row>' +
        '</div>' +
    '</div>',
    data: {
        cars: frontendData.cars,
        item:'',
        profile:frontendData.profile
    },
    methods:{
        editcars(item){
            this.item = item;
        }
    }
});
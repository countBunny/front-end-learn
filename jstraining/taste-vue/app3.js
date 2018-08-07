var app = new Vue({
    el: "#app",
    data: {
        counter: 0,
    },
    methods: {
        increment: function() {
            this.counter++;
        }
    }
})
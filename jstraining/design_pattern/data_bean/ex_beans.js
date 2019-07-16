// export
// class Author {
//     name;
//     books;
//
//     constructor(name, books) {
//         this.name = name;
//         this.books = books;
//     }
// }
const Author = function (name, books) {
    this.name = name;
    this.books = books;
}

// export
const Mixin = function () {

};

Mixin.prototype = {
    serialize: function () {
        var output = [];
        for (let key in this) {
            output.push(key + ':' + this[key]);
        }
        return output.join(', ');
    }
};

module.exports = {
    Author: Author,
    Mixin: Mixin
};
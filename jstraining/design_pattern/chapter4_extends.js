// import {Author, Mixin} from "./data_bean/ex_beans";
const {Author, Mixin} = require('./data_bean/ex_beans');
function augment(receivingClass, givingClass) {
    for(let methodName in givingClass.prototype) {
        if(!receivingClass.prototype[methodName]) {
            receivingClass.prototype[methodName] = givingClass.prototype[methodName];
        }
    }
}
//掺元
augment(Author, Mixin);

var author = new Author('Ross Harmes', ['JavaScript Design Patterns']);
console.log(author.serialize());
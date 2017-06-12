## Making the data editable
You can make the data being displayed dynamic by using the **value** binding, aling with some regular HTML **<input>** controls, to make the data editable.

you will also need to add **observables** to your Javascript model values.  These are properties that automatically issue notifications whenever their value changes.

See below Models

**index.html**
```html
<p>First Name: <input data-bind="value: firstName"/></p>
<p>Last Name: <input data-bind="value: lastName"/></p>
```

**ViewModel.js**
```javascript
function AppViewModel() {
    this.firstName = ko.observable("Alistair");
    this.lastName = ko.observable("Mackay");
}
```
Whatever you type into the input sections will update the data-binded values.
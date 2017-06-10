# Inroduction

*Alistair Side Note: Everything looks like a function in this framework.*

In this first tutorial you'll experience some of the basics of building a web UI with the Model-View-ViewModel (MVVM) pattern using knockout.js.

You'll learn how to define a UI's appearance using views and declarative bindings, its data and behavior using viewmodels and observables, and how everything stays in sync automatically thanks to Knockout's dependency tracking (even with arbitrary cascading chains of data).

Two main files being used in this tutorial the index.html file and the ViewModel:

## Using Bindings in the view.

You can bind data from your View model to html by using the **text** properties in your **data-bind** attributes.

**index.html**
```html
<p>First Name: <strong data-bind="text: firstName"></strong></p>
<p>Last Name: <strong data-bind="text: lastName"></strong></p>
```

**ViewModel.js**
```javascript
//This is a simple *viewmodel* - JavaScript that defines the data and behaviour of your UI
function AppViewModel() {
    this.firstName = "Alistair";
    this.lastName = "Mackay";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
```
**data-bind** attributes in your html elements allow you to associate data from a chosen javascript model.  You used the **text** binding to assign text to your DOM elements.

**Output**
```
First Name: **Alistair**
Last Name: **Mackay**
```
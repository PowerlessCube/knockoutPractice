# Inroduction

*Alistair Side Note: Everything looks like a function in this framework.*

In this first tutorial you'll experience some of the basics of building a web UI with the Model-View-ViewModel (MVVM) pattern using knockout.js.

You'll learn how to define a UI's appearance using views and declarative bindings, its data and behavior using viewmodels and observables, and how everything stays in sync automatically thanks to Knockout's dependency tracking (even with arbitrary cascading chains of data).

Two main files being used in this tutorial the index.html file and the ViewModel:

## Using Bindings in the view.

You can bind data from your View model to html by using the **text** properties in your **data-bind** attributes.

**index.html**
```
<p>First Name: <strong data-bind="text: firstName"></strong></p>
<p>Last Name: <strong data-bind="text: lastName"></strong></p>
```

**ViewModel.js**
```
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

## Making the data editable
You can make the data being displayed dynamic by using the **value** binding, aling with some regular HTML **<input>** controls, to make the data editable.

you will also need to add **observables** to your Javascript model values.  These are properties that automatically issue notifications whenever their value changes.

See below Models

**index.html**
```
<p>First Name: <input data-bind="value: firstName"/></p>
<p>Last Name: <input data-bind="value: lastName"/></p>
```

**ViewModel.js**
```
function AppViewModel() {
    this.firstName = ko.observable("Alistair");
    this.lastName = ko.observable("Mackay");
}
```
Whatever you type into the input sections will update the data-binded values.

## Defining Computed Values
Often you'll want to combine/convert multiple observable values to make others.

Knowck has a concept called **computed properties** - these are *observable* (i.e., they notify on change) and they are computed based on the values of other observables.

**index.html**
```
<p>First Name: <strong data-bind="text: firstName"></strong></p>
<p>Last Name: <strong data-bind="text: lastName"></strong></p>

<p>First Name: <input data-bind="value: firstName"/></p>
<p>Last Name: <input data-bind="value: lastName"/></p>

<p>Full Name: <storng data-bind="text: fullName"></storng></p>
```

**ViewModel.js**
```
// firstname, last name are above this section.
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
}
```

If you run the application now and edit the text boxes, you';; seee that all the UI elements (including the full name display) stay in sync with the underlying data.

**How it works**
Things stay in sync because of automatic dependency tracking: the fullName html depends on fullName in the js which in turn depends on the firstName and lastName, which can be altered by editing one of those textboxes.

# Updating the ViewModel
You can add **click** event that update the model values, see the below example:

**ViewModel.js**
```
function AppViewModel() {
    // ... leave firstName, lastName, and fullName unchanged here...

    this.capitalizeLastName = function() {
        this.capitalizeLastName = function() {
            var currentVal = this.lastName(); // Read the current value
            this.lastName(currentVal.toUpperCase()); //Write back a modified value.
        };
    }
}
```
If you run this now and click "Go caps", you'll see all relevant parts of the UI being updated to match the changed viewmodel state.



















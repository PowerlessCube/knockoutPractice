## Defining Computed Values
Often you'll want to combine/convert multiple observable values to make others.

Knowck has a concept called **computed properties** - these are *observable* (i.e., they notify on change) and they are computed based on the values of other observables.

**index.html**
```html
<p>First Name: <strong data-bind="text: firstName"></strong></p>
<p>Last Name: <strong data-bind="text: lastName"></strong></p>

<p>First Name: <input data-bind="value: firstName"/></p>
<p>Last Name: <input data-bind="value: lastName"/></p>

<p>Full Name: <storng data-bind="text: fullName"></storng></p>
```

**ViewModel.js**
```javascript
// firstname, last name are above this section.
    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
}
```

If you run the application now and edit the text boxes, you';; seee that all the UI elements (including the full name display) stay in sync with the underlying data.

**How it works**
Things stay in sync because of automatic dependency tracking: the fullName html depends on fullName in the js which in turn depends on the firstName and lastName, which can be altered by editing one of those textboxes.
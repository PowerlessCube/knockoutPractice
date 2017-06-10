//This is a simple *viewmodel* - JavaScript that defines the data and behaviour of your UI
function AppViewModel() {
    this.firstName = ko.observable("Alistair");
    this.lastName = ko.observable("Mackay");

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);

    this.capitalizeLastName = function() {
        this.capitalizeLastName = function() {
            var currentVal = this.lastName(); // Read the current value
            this.lastName(currentVal.toUpperCase()); //Write back a modified value.
        };
    }
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
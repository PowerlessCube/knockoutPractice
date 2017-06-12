//This is a simple *viewmodel* - JavaScript that defines the data and behaviour of your UI
function AppViewModel() {
    this.firstName = ko.observable("Alistair");
    this.lastName = ko.observable("Mackay");

    this.fullName = ko.computed(function() {
        return this.firstName() + " " + this.lastName();
    }, this);
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
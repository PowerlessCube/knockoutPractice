// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
function AppViewModel() {
    this.firstName = ko.observable("Alistair");
    this.lastName = ko.observable("Mackay");
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());
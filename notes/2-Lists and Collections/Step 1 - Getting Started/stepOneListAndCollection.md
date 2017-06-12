# Working With Lists and Collections

Often you'll want to dynamically generate lists UI elements where the user can add and remove elements.  Knockout lets you do that easily, using *observable arrays* and the **foreach** binding.

# Details on the following Models:
- **SeatReservation** - javascript class constructor that stores a passenger name with a meal selction.
- **ReservationsViewModel** - viewmodel class that holds:
    - **availableMeals** - a Javascript object provding meal data.
    - **seats** - an array holding an initial collection of **SeatReservation** instances. *Note* that it's a **ko.observableArray** - it's an *observale* equivalent of a regular array, which means it can automatically trigger UI updates whenever items are added or removed.


## Using foreach

Using the foreach binding as an attribute the `<tbody>` element to use the foreach, so that it will render a copy of its child elements for each entry in the seats array:

**ListAndCollectionViewModel.js**
```javascript
// Class to represent a row in the seat reservations grid
function SeatReservation(name, initialMeal) {
    var self = this;
    self.name = name;
    self.meal = ko.observable(initialMeal);
}

// Overall viewmodel for this screen, along with initial state
function ReservationsViewModel() {
    var self = this;

    // Non-editable catalog data - would come from the server
    self.availableMeals = [
        { mealName: "Standard (sandwich)", price: 0 },
        { mealName: "Premium (lobster)", price: 34.95 },
        { mealName: "Ultimate (whole zebra)", price: 290 }
    ];    

    // Editable data
    self.seats = ko.observableArray([
        new SeatReservation("Steve", self.availableMeals[0]),
        new SeatReservation("Bert", self.availableMeals[1])
    ]);
}

ko.applyBindings(new ReservationsViewModel());
```

**listAndCollection.md**
```html
<h2>Your seat reservations</h2>

<table>
    <thead>
        <tr>
            <th>Passenger Name</th>
            <th>Meal</th>
            <th>Surcharge</th>
        </tr>
    </thead>
    <tbody data-bind="foreach: seats">
        <tr>
            <td data-bind="text: name"></td>
            <td data-bind="text: meal().mealName"></td>
            <td data-bind="text: meal().price"></td>
        </tr>
    </tbody>
</table>
```

*Note* - Notice that, because the meal property is an observable, it's important to invoke meal() as a function (to obtain its current value) before attempting to read sub-properties. In other words, write meal().price, not meal.price.

**foreach** is part of a family of control flow bindings that includes **foreach**, **if**, **ifnot**, and **with**. These make it possible to construct any kind of iterative, conditional, or nested UI based on your dynamic viewmodel.
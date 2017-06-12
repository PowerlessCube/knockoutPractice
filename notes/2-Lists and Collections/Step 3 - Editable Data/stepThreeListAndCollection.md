## Making the data editable

You can make what we have more dynamic by using **data-bindings** within the **foreach** block.

The below code also shows how to handle ```<select>``` inputs in knockout.

**listAndCollection.html**
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
            <td><input data-bind="text: name" type="text" /></td>
            <td><select data-bind="options: $root.availableMeals, value: meal, optionsText: 'mealName'"></select></td>
            <td data-bind="text: meal().price"></td>
        </tr>
    </tbody>
</table>

<button data-bind="click: addSeat">Reserve another seat</button>
```

This code uses two new bindings, **options** and **optionsText**, which together control both the set of available items in a dropdown list, and which object property (in this case, **mealName**) is used to represent each item on screen.


## Formatting Prices
We've got a nice object-oriented representation of our data, so we can trivially add extra properties and functions anywhere in the object graph. Let's give the SeatReservation class the ability to format its own price data using some custom logic.

**ListAndCollectionViewModel.js**
```javascript
function SeatReservation(name, initialMeal) {
    // ...name and self.meal are up here...

    self.formattedPrice = ko.computed(function() {
        var price = self.meal().price;
        return price ? "$" + price.toFixed(2) : "None";        
    });
}
```

**listAndCollection.html**
```html
<tbody data-bind="foreach: seats">
        <tr>
           <!-- name and meal options are above this-->
            <td data-bind="text: formattedPrice"></td>
        </tr>
    </tbody>
```
Since the formatted price will be computed based on the selected meal, we can represent it using ko.computed (so it will update automatically whenever the meal selection changes)
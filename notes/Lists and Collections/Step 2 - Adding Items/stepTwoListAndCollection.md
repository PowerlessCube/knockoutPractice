## Adding Items

Following the MVVM pattern makes it very simple to work with changeable object graphs such as arrays and hierarchies. You update the underlying data, and the UI automatically updates in sync.

With that in mind we can update our view and add functionality to add a new seat reservation using **click** property.

**ListAndCollectionViewModel.js**
```javascript
function ReservationsViewModel() {
    // ... leave all the rest unchanged ...

    // Operations
    self.addSeat = function() {
        self.seats.push(new SeatReservation("", self.availableMeals[0]));
    }
}
```

**ListAndCollection.html**
```html
<!-- Leave the rest unchanged -->
<button data-bind="click: addSeat">Reserve another seat</button>
```

Try it - now when you click "Reserve another seat", the UI updates to match. This is because **seats** is an *observable array*, so adding or removing items will trigger UI updates automatically.

*Note* - adding a row does not involve regenerating the entire UI. For efficiency, Knockout tracks what has changed in your viewmodel, and performs a minimal set of DOM updates to match. This means you can scale up to very large or sophisticated UIs, and it can remain snappy and responsive even on low-end mobile devices.
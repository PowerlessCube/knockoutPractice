## Removing items and showing a total surcharge

Since you can add items by updating the underlying data, you can remove items in a similar way.

Update your view so that it displays a "remove" link next to each item:

**ListAndCollection.html**
```html
<tbody data-bind="foreach: seats">
    <tr>
        <!-- name, options, price are above here.-->
        <td><a href="#" data-bind="click: $root.removeSeat">Remove</a></td>
    </tr>
</tbody>
```

*Note* - **$root**. prefix causes Knockout to look for a **removeSeat** handler on your top-level viewmodel instead of on the **SeatReservation** instance being bound --- that's a more convenient place to put **removeSeat** in this example. So, add a corresponding **removeSeat** function to your root viewmodel class, **ReservationsViewModel**:

**ListAndCollectionViewModel.js**
```javascript
function ReservationsViewModel() {
    // ... leave the rest unchanged ...

    // Operations
    self.addSeat = function() { /* ... leave unchanged ... */ }
    self.removeSeat = function(seat) { self.seats.remove(seat) }
}  
```

Now if you run the application, you'll be able to remove the items as well as add them.

## Displaying a total surcharge

It would be nice to let the customer know what they will be paying, right? Not surprisingly, we can define the total as a computed property, and let the framework take care of knowing when to recalculate and refresh the display.

Add the following **ko.computed** property inside **ReservationsViewModel**:

**ListAndCollectionViewModel.js**
```javascript
self.totalSurcharge = ko.computed(function() {
   var total = 0;
   for (var i = 0; i < self.seats().length; i++)
       total += self.seats()[i].meal().price;
   return total;
});
```
Again, notice that since **seats** and **meal** are both observables, we're invoking them as functions to read their current values (e.g., **self.seats().length**).

Display the total surcharge by adding the following ```<h3>``` element to the bottom of your view:
**listAndCollection.html**
```html
<!-- button and the rest of the stuff is located above this point-->
<h3 data-bind="visible: totalSurcharge() > 0">
    total surcharge: £<span data-bind="text: totalSurcharge().toFixed(2)"></span>
</h3>
```

This snippet demonstrates two new points:

- The **visible** binding makes an element visible or invisible as your data changes (internally, it modifies the element's CSS **display** style). In this case, we choose to show the "total surcharge" information only if it's greater than zero.

- You can use arbitrary JavaScript expressions inside declarative bindings. Here, we used  **totalSurcharge() > 0** and **totalSurcharge().toFixed(2)**. Internally, this actually defines a computed property to represent the output from that expression. It's just a very lightweight and convenient syntactical alternative.

Now if you run the code, you'll see "total surcharge" appear and disappear as appropriate, and thanks to dependency tracking, it knows when to recalculate its own value — you don't need to put any code in your "add" or "remove" functions to force dependencies to update manually.
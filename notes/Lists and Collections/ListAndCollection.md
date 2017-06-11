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


## Final niceties

Having followed the MVVM pattern and got an object-oriented representation of the UI's data and behaviors, you're in a great position to sprinkle on extra behaviors in a very natural and convenient way.

For example, if you're asked to display the total number of seats being reserved, you can implement that in just a single place, and you don't have to write any extra code to make the seat count update when you add or remove items. Just update the ```<h3>``` at the top of your view:

**listAndCollection.html**
```html
<h3>Your seat reservations (<span data-bind="text: seats().length" ></span>)</h3>
```

Trivial.

Similarly, if you're asked to put a limit on the number of seats you can reserve, say, you can make the UI represent that by using the enable binding:

**ListAndCollection.html**
```html
<button data-bind="click: addSeat, enable: seats().length < 5">Reserve another seat</button>
```

The button becomes disabled when the seat limit is reached. You don't have to write any code to re-enable it when the user removes some seats (cluttering up your "remove" logic), because the expression will automatically be re-evaluated by Knockout when the associated data changes.
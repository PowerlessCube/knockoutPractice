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
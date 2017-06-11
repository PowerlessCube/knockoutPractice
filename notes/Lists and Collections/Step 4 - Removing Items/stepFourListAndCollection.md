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
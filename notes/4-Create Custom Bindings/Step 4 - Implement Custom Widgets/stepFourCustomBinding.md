# Implement custom widgets

To finish this tutorial, let's do something a bit more interesting. Let's replace the *"importance"* dropdowns with a nicer-to-use star-rating system. You could do this in just a few lines of code by making a binding to wrap an existing star-rating widget (example) but for the sake of learning, let's build one entirely from scratch.

To get started, define a starRating binding by adding the following to the top of the viewmodel pane:

**CustomBindings.js**
```javascript
ko.bindingHandlers.starRating = {
    init: function(element, valueAccessor) {
        $(element).addClass("starRating");
        for (var i = 0; i < 5; i++)
           $("<span>").appendTo(element);
    }
};
```
This code simply inserts a series of `<span>` elements. There's already some CSS prepared for you to make them display as stars. To use it, update your view, getting rid of the `<select>` dropdowns:

**CustomBinding.html**
```html
<tbody data-bind="foreach: answers">
    <tr>
        <td data-bind="text: answerText"></td>
        <td data-bind="starRating: points"></td>
    </tr>    
</tbody>
```
## Displaying the current rating

You'll want the star ratings to update automatically whenever the underlying viewmodel data changes, so you can use an  **update** handler to assign a suitable CSS class depending on the current data:

**CustomBinding.js**
```javascript
ko.bindingHandlers.starRating = {
    init: /* ... leave "init" unchanged ... */,
    update: function(element, valueAccessor) {
        // Give the first x stars the "chosen" class, where x <= rating
        var observable = valueAccessor();
        $("span", element).each(function(index) {
            $(this).toggleClass("chosen", index < observable());
        });
    }
};
```
Since the initial point allocations are all 1, you should get one star highlighted for each answer.

## Highlighting as the mouse hovers

As the visitor mouses over the stars, it's nice to highlight the ones they're about to select. The "highlight" state doesn't really need to be linked to the viewmodel as you're not storing that data in any way, so the easiest option is to control highlighting with some raw jQuery code.

You can use jQuery's hover function to catch hover-in and hover-out events, setting suitable CSS classes on the affected stars:

**CustomBinding.js**
```javascript
init: function(element, valueAccessor) {
    // ... leave existing code unchanged ... 

    // Handle mouse events on the stars
    $("span", element).each(function(index) {
        $(this).hover(
            function() { $(this).prevAll().add(this).addClass("hoverChosen") }, 
            function() { $(this).prevAll().add(this).removeClass("hoverChosen") }                
        );
    });
},
```

Now as you move the mouse, you'll see the stars light up.

Writing data back to the viewmodel

When the visitor clicks on a star, you'll want to store their updated rating in the underlying viewmodel, so the rest of the UI can update automatically. This is pretty easy to do: use jQuery's click function to catch those clicks:

// Handle mouse events on the stars
$("span", element).each(function(index) {
    $(this).hover(
        function() { $(this).prevAll().add(this).addClass("hoverChosen") }, 
        function() { $(this).prevAll().add(this).removeClass("hoverChosen") }                
    ).click(function() { 
       var observable = valueAccessor();  // Get the associated observable
       observable(index+1);               // Write the new rating to it
     }); 
});
Try it - your star rating system should now be fully functional! The UI now all updates in sync with the visitor's ratings.

Summary

The starRating binding is about as complicated as bindings usually get. It illustrates how bindings are often the place where your code drops below the nicely declarative, object-oriented MVVM layer and into the more raw, low-level DOM manipulation layer to make the necessary UI updates. Whether or not this is comfortable and easy for you depends on your skills with jQuery or any other DOM library...

As usual, starRating is completely reusable anywhere in your application where you want to display a numerical viewmodel property as some stars on the screen, automatically refreshing the display whenever the viewmodel data changes. It neatly separates the business of displaying stars from any viewmodel logic concerned with the visitor's selections.
#Applying an animated transition

When the visitor assigns too many points, the *"You've used too many points"* warning snaps rudely into visibility, because its display is controlled using the built-in **visible** binding. If you wanted to make it **fade** smoothly in and out, you could write a quick, reusable custom binding that internally uses jQuery's fade function to implement the animation.

You can define a custom binding by assigning a new property to the **ko.bindingHandlers object**. Your property can expose two callback functions:

- **init**, to be called when the binding first happens (useful to set initial state or register event handlers)

- **update**, to be called whenever the associated data updates (so you can update the DOM to match)
Start defining a fadeVisible binding by adding the following code at the top of the viewmodel pane:

**CustomBinding.js**
```javascript
ko.bindingHandlers.fadeVisible = {
    update: function(element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    } 
};
```
As you can see, the update handler is given both the element to which it is bound, and a function that returns the current value of the associated data. Based on that current value, you can use jQuery to fade the element in or out.

To use your custom binding, simply modify the "You've used too many points" warning so that it uses fadeVisible instead of visible:

**CustomBind.html**
```html
<h3 data-bind="fadeVisible: pointsUsed() > pointsBudget">
```

You've used too many points! Please remove some. `</h3>`
Try running it - the behavior is almost perfect already. The warning will smoothly fade in and out as needed.


## Setting the element's initial state

One thing's not right, though: when the page first loads, the warning momentarily starts visible and immediately fades out (click Run a few times if you need to see it happening). You'll need to use an **init** handler to ensure the element's initial state matches the initial viewmodel data.

That's pretty easy - add an init handler to your custom binding:

**CustomBinding.js**
```javascript
ko.bindingHandlers.fadeVisible = {
    init: function(element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: // ... leave the "update" handler unchanged ...
};
```
That fixes it! Now the animation only happens when the viewmodel changes.

Creating the **fadeVisible** binding might seem like a bit of work, but this is completely reusable code, so you can keep it in a separate "bindings" JavaScript file and then use it in place of **visible** anywhere in your application.

### New Concepts introduced
- **ko.bindingHandlers object** - place to control the logic of your custom bindings.
    - **init**
    - **update**


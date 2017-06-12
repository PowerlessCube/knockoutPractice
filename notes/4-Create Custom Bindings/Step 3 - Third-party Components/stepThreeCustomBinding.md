# Integrating with third-party components

If you want your views to contain components from external JavaScript libraries (for example, jQuery UI or YUI) and bind them to viewmodel properties, the easiest technique is to create a custom binding. Your binding will intermediate between your viewmodel and the third-party component.

As an example, let's use jQuery UI's "button" widget to improve the look-and-feel of the *"Finished"* button.

Getting started is pretty trivial. Define a **jqButton** binding by adding the following code at the top of the viewmodel pane:

**CustomBinding.js**
```javascript
ko.bindingHandlers.jqButton = {
    init: function(element) {
       $(element).button(); // Turns the element into a jQuery UI button
    }
};
```
To use the binding, update the **"Finished"** button in the view:

**CustomBinding.html**
```html
<button data-bind="jqButton: true, enable: pointsUsed() <= pointsBudget, click: save">Finished</button>
```

Try it - it pretty much works already. The button appearance is improved, and clicking it still works the same.

## Toggling the button's "disabled" state

Your button no longer visibly becomes disabled when the visitor has exceeded their points budget. The **enable** binding doesn't work directly with a jQuery UI button, because jQuery UI buttons don't automatically respond to the usual HTML **disabled** attribute. Instead, jQuery UI buttons have a special API for controlling their enabled/disabled appearance.

That's no problem: you can use an **update** handler to tell the button when to enable/disable itself:

**CustomBinding.js**
```javascript
ko.bindingHandlers.jqButton = {
    init: /* ... leave "init" unchanged ... */,
    update: function(element, valueAccessor) {
        var currentValue = valueAccessor();
        // Here we just update the "disabled" state, but you could update other properties too
        $(element).button("option", "disabled", currentValue.enable === false);
    }
};     
```

To use this, update the *"Finished"* button so that you're passing an **enable** property into the **jqButton** binding:

**CustomBinding.html**
```html
<button data-bind="jqButton: { enable: pointsUsed() <= pointsBudget }, click: save">Finished</button>
```
Now the button will visibly grey out if the visitor exceeds their points budget.

Again, the **jqButton** binding is reusable on any button anywhere in your application, letting you declaratively associate the button's enabled/disabled state with any viewmodel condition. You could also enhance the binding to control declaratively other jQuery UI button properties too, such as which icon appears in the button.
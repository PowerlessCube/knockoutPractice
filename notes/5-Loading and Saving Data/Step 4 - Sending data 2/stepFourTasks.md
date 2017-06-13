# Sending data back to the server: method 2

As an alternative to a full HTML `<form>` post, you can of course send your model data to the server using an Ajax request. For example, *remove* the `<form>` you just added in the previous step, and replace it with a simple `<button>`:

**Tasks.html**
```html
<button data-bind="click: save">Save</button>
```

... then implement the **save** function by adding an extra function to **TaskListViewModel**:

**Tasks.js**
```javascript
function TaskListViewModel() {
    // ... leave all the exiting code unchanged ...

    self.save = function() {
        $.ajax("/tasks", {
            data: ko.toJSON({ tasks: self.tasks }),
            type: "post", contentType: "application/json",
            success: function(result) { alert(result) }
        });
    };
}
```

In this example, the **success** handler simply **alerts** whatever the server responds, just so you can see the server really did receive and understand the data. In a real application, you'd be more likely to show a "saved" flash message or redirect away to some other page.
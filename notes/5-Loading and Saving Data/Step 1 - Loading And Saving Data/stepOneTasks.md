# Loading data from the server

The easiest weay to get JSON data from the server is by making an Ajax request. In this tutorial, you'll use jQuery's **$.getJSON** and **$.ajax** functions to do that. Once you've got the data, you can use it to update your viewmodel, and let the UI update itself automatically.

On this server, there's some code that handless requests to the URL **/tasks**, and responds with JSON data. Add code to the end of **TaskListViewModel** to request that data and use it to populate the **tasks** array:

**Tasks.js**
```javascript
function TaskListViewModel() {
    // ...leave the existing code unchanged...

    // Load initial state from server, convert it to Task instances, then populate self
    $.getJSON("/tasks", function( allData ) {
        var mappedTasks = $.map(allData, function(item) { return new Task(item) });
        self.tasks(mappedTasks);
    });
}
```

***Important note!*** *Notice that you're **not** calling **ko.applyBindings** after loading the data. Many Knockout newcomers make the mistake of trying to re-bind their UI every time they load some data, but that's not useful. There's no reason to re-bind - simply updating your existing viewmodel is enough to make the whole UI update.*

This code takes the raw data array returned by the server and uses jQuery's **$.map** helper to construct a **Task** instance from each raw entry. The resulting array of **tasks** array, which causes the UI to update because it's observable.

## Manual or automated?

The preceding code demonstrates a manual way to fetch and map your data, which gives you the greatest amount of direct control. If you prefer a bit more automation, you might want to look at [the knockout.mapping plugin](http://knockoutjs.com/documentation/plugins-mapping.html), which can:

- Automatically construct arbitrary object graphs of observable data.

- Map by convention, or using explicityly-configured mapping callbacks.

- Apply changes to an existing object graph if you later fetch updated data from the server.



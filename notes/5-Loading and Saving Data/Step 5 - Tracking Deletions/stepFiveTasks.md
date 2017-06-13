
# Tracking Deletions

If the user has deleted some data on the client, how will the server know to delete the corresponding database records? One possibility is that the server should inspect the incoming data set, compare it with what's in the database, and infer which records were deleted. But that's pretty awkward - it's much nicer if the client submits data that explicitly states which records were deleted.

When manipulating an observable array, you can easily track deletions by using the **destory** function to remove items. For examole update your **removeTaks** function:

**Tasks.js**
```javascript
self.removeTask = function(task) { self.tasks.destroy(task) };
```

What does this do? Well, it no longer actually removes **Task** instances from the **tasks** array - instead, it simply adds a **\_destroy** property to the **Task** instances with value **true**. This exactly matches the Ruby on Rails convention of using **\_destroy** to indicate that a submitted item should be deleted. The **foreach** binding is aware of this, and won't display any item with that property value (which is why items disappear when destroyed).

## How will the server handle this?

If you save the data now, you'll see that the server still receives the destroyed items, and it can tell which ones you're asking to delete (because they have a **destroy** property set to **true**).

- If you're using the automatic JSON parsing feature in Rails, ActiveRecord will already know you want to delete the corresponding item.

- For other technologies, you can add a bit of server-side code to spot **_destroy** and delete those items.

If you want to see more clearly what data the server receives in this example, try replacting the Ajax-powered "Save" button with the HTML-form technique from step 3 in this tutorial.

## Hey, my task counter no longer works!

Notice that the *"You have x incomplete task(s)"* caption no longer filters out deleted items, because you incompleteTasks computed property doesn't know anything about the **_destroy** flag. Fix this by filtering out destroyed tasks:

**Tasks.js**
```javascript
self.incompleteTasks = ko.computed(function() {
    return ko.utils.arrayFilter(self.tasks(), function(task) { return !task.isDone() && !task._destroy });
});
```

Now the UI will consistently pretend that **_destroyed** tasks don't exist, even though they are still tracked internally.
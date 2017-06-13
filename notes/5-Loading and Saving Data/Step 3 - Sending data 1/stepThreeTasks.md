# Sending data back to the server: method 1

Of course, you can also use Ajax requests to send data back to the server. But before we get to that, there's a poossibly simpler alternative to consider.

If you have some representation of your model data inside a regular HTML `<form>`, then you can simply let the user post that form to your server. This is very easy to do.  For example, add the following form markup at the bottom of your view:

**Tasks.html**
```html
<form action="/tasks/saveform" method="post">
    <textarea name="tasks" data-bind="value: ko.toJSON(tasks)"></textarea>
    <button type="submit">Save</button>
</form>
```

This snippet uses `<textarea>` just so you can see what's happening behind the scenes. Try it: as the visitor edits data in the UI, dependency tracking will cause the JSON representation in the textarea to update automatically. When the vistor submits the form, your server-side code will receive that JSON data.

you don't really want to display a visible `<textarea>` to actual vistors, so replace it with a hidden input control:

**Tasks.html**
```html
<form action="/tasks/saveform" method="post">
    <input type="hidden" name="tasks" data-bind="value: ko.toJSON(tasks)"></textarea>
    <button type="submit">Save</button>
</form>
```

## Receiving JSON data on othe server

The way your server-side technology handles incoming JSON data is off-scope for this tutorial, but it's pretty easy with most technologies. For example, Rails can parse incoming JSON data [automatically](http://www.digitalhobbit.com/2008/05/25/rails-21-and-incoming-json-requests/) or [manually](https://stackoverflow.com/questions/1826727/how-do-i-parse-json-with-ruby-on-rails), here's [an example of making ASP.NET MVC model-bind JSON form data](http://blog.stevensanderson.com/2010/07/12/editing-a-variable-length-list-knockout-style/), and PHP has its [json_decode function](http://php.net/manual/en/function.json-decode.php).


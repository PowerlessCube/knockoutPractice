# Loading and saving data

By now, you've got a good understanding of how the MVVM pattern helps you neatly organize the client-side code for a dynamic UI, and how Knockout's *observables*, *bindings*, and *dependency tracking* make it work. In almost all web applications, you'll also need to get data from the server, and send modified data back.

Since Knockout is a purely client-side library, it has the flexibility to work with any server-side technology (e.g., ASP.NET, Rails, PHP, etc.), and any architectural pattern, database, whatever. As long as your server-side code can send and receive JSON data — a trivial task for any half-decent web technology — you'll be able to use the techniques shown in this tutorial.

## Scenario for this tutorial

All JavaScript libraries are legally required to offer a *"task list"* example (note: that's a joke) so here's one. Take a moment to play with it - add and remove some tasks - and read through the code to understand how it works. It's pretty basic and predictable. Next, you'll load some initial task list from the server, and then see two different ways to save modified data back to the server
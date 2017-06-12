#Creating custom bindings

In Knockout's interpretation of MVVM, bindings are what join your view and viewmodel together. Bindings are the intermediaries; they perform updates in both directions:

- Bindings notice viewmodel changes and correspondingly update the view's DOM
- Bindings catch DOM events and correspondingly update viewmodel properties

Knockout has a flexible and comprehensive set of built-in bindings (e.g., **text**, **click**, **foreach**), but it's not meant to stop there - you can create **custom bindings** in just a few lines of code. In any realistic application you'll find it beneficial to encapsulate common UI patterns inside bindings, so those patterns can trivially be reused in multiple places. For example, this website uses custom bindings to encapsulate its approach to dialogs, draggable panes, code editors, and even to render the text you're reading (it's written in markdown).

###OK, let's create some of our own

You've already got some code that represents an unexciting but functional survey page. Have a go at using it. Now let's improve the look and feel in three ways:

- ... with an animated transition on the *"You've used too many points"* warning
- ... with improved styling on the *Finished* button
- ... with a fun-to-use star-rating display for assigning points, instead of the annoying drop-down lists
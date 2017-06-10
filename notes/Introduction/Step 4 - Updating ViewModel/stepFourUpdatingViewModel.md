# Updating the ViewModel
You can add **click** event that update the model values, see the below example:

**ViewModel.js**
```javascript
function AppViewModel() {
    // ... leave firstName, lastName, and fullName unchanged here...

    this.capitalizeLastName = function() {
        this.capitalizeLastName = function() {
            var currentVal = this.lastName(); // Read the current value
            this.lastName(currentVal.toUpperCase()); //Write back a modified value.
        };
    }
}
```
If you run this now and click "Go caps", you'll see all relevant parts of the UI being updated to match the changed viewmodel state.
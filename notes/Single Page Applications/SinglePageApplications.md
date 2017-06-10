# Single Page Applications

*Note from PowerlessCube - This tutorial seems to use a hidden CSS file that is not visible to the user, you may want to work through these steps in the [browser](http://learn.knockoutjs.com/#/?tutorial=webmail)*

Many of the most modern, responsive, and engaging web-based UIs have gone beyond traditional Ajax and have become single page applications: the visitor can seemingly navigate within a single page at the speed of a native application. The best-known example is probably GMail, but these days it's an increasingly widespread technique.

Such applications use **hash-based** or **pushState navigation** to support back/forward gestures and bookmarking. If you're not familiar with how that technique works, check out the below code snippet:
```
How hash-based/pushState navigation works

For hash-based navigation, the visitor's position in a virtual navigation space is stored in the URL hash, which is the part of the URL after a 'hash' symbol (e.g., /my/app/#category=shoes&page=4). Whenever the URL hash changes, the browser doesn't issue an HTTP request to fetch a new page; instead it merely adds the new URL to its back/forward history list and exposes the updated URL hash to scripts running in the page. The script notices the new URL hash and dynamically updates the UI to display the corresponding item (e.g., page 4 of the "shoes" category).

This makes it possible to support back/forward button navigation in a single page application (e.g., pressing 'back' moves to the previous URL hash), and effectively makes virtual locations bookmarkable and shareable.

pushState is an HTML5 API that offers a different way to change the current URL, and thereby insert new back/forward history entries, without triggering a page load. This differs from hash-based navigation in that you're not limited to updating the hash fragment — you can update the entire URL.
```

## Example: Building a webmail client

You've got a simple viewmodel that currently just holds a list of folders. Your first job is to display those folders on the screen, and to make them selectable.

You can use foreach to display the folders as a list. Add the following to your view:

**Webmail.html**
```html
<!-- Folders -->
<ul data-bind="foreach: folders">
    <li data-bind="text: $data"></li>
</ul>
```

If you run the application, you should have a bullet-pointed list. That's nice and semantic, but not very attractive! Improve the styling by adding the folders class to your <ul>:

**Webmail.html**
```html
<ul class="folders" data-bind="foreach: folders">
```

That makes it look much better.

## Making the folders selectable

Because this is MVVM, we'll represent navigation position using viewmodel properties. That will make hash-based navigation very easy later. Add a **chosenFolderId** property to your viewmodel class, and a function called  **goToFolder**:

**WebmailViewModel.js**
```javascript
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();

    // Behaviours
    self.goToFolder = function(folder) { self.chosenFolderId(folder); };
};
```
Now you can use the **css** binding to apply a **selected** class to the matching folder, and also invoke **goToFolder** whenever the user clicks on a folder:

**Webmail.html**
```html
<li data-bind="text: $data, 
               css: { selected: $data == $root.chosenFolderId() },
               click: $root.goToFolder"></li>
```

## Displaying a grid of mails

No the visitor can choose a folder, let's show them the mails in that folder. Start by defining a **chosenFolderData** property on your viewmodel:

**WebmailViewModel.js**
```javascript
function WebmailViewModel() {
    
        // folders and chosenFolderId are above here
        self.chosenFolderData = ko.observable();
    };
};
```
Next, whenever the user navigates to a folder, populate **chosenFolderData** by performing an Ajax request:

**WebmailViewModel.js**
```javascript
    self.goToFolder = function(folder) { 
        self.chosenFolderId(folder); 
        $.get('/mail', {folder: folder}, self.chosenFolderData);
    }; 
```
Finally, display **chosenFolderData** as a grid, by adding the following at the bottom of your view:

**Webmail.html**
```html
<!-- Mails grid-->
<table class="mails" data-bind="with: chosenFolderData">
    <thead>
        <tr>
            <th>From</th>
            <th>To</th>
            <th>Subject</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody data-bind="foreach: mails">
        <tr data-bind="click: $root.goToMail">
            <td data-bind="text: from"></td>
            <td data-bind="text: to"></td>
            <td data-bind="text: subject"></td>
            <td data-bind="text: date"></td>
        </tr>
    </tbody>
</table>
```

The **with** binding creates a *binding context* that will be used when binding any elements inside it. In this example, everything inside the ```<table>``` will be bound to chosenFolderData, so it's not necessary to use chosenFolderData. as a prefix before mails.

Last thing, let's make the "Inbox" appear by default (i.e., without needing the user to click it):

**WebmailViewModel.js**
```javascript
function WebmailViewModel() {
    // ... leave everything else unchanged ...

    // Show inbox by default
    self.goToFolder('Inbox');
};
```

## Viewing Individual Emails

The visitor can now navigate between folders. What about letting them open and read specific emails? As with folder navigation, let's start by defining a viewmodel property to represent data loaded for a specific mail:

**WebmailViewModel.js**
```javascript
function WebmailViewModel() {
    // Data
    var self = this;
    self.folders = ['Inbox', 'Archive', 'Sent', 'Spam'];
    self.chosenFolderId = ko.observable();
    self.chosenFolderData = ko.observable();
    self.chosenMailData = ko.observable();

    // ... leave everything else unchanged ...
}
```

Next you need to update your bindings, so that if the visitor clicks on a row in the mails grid, your viewmodel loads the corresponding mail. First use the **click** binding on the ```<tr>``` elements:

**Webmail.html**
```html
<tbody data-bind="foreach: mails">
    <tr data-bind="click: $root.goToMail">
    <!--... rest as before ...-->
```

Next, implement **goToMail** on WebmailViewModel, causing it to update **chosenMailData** and **chosenFolderData** by means of an Ajax request:

**WebmailViewModel.js**
```javascript
// Behaviours    
    self.goToFolder = function(folder) { 
        self.chosenFolderId(folder); 
        self.chosenMailData(null); // Stop showing a mail
        $.get('/mail', {folder: folder}, self.chosenFolderData);
    };

    self.gotToMail = function(mail) {
        self.chosenFolderId(mail.folder);
        self.chosenFolderData(null); // Stop Showing a folder
        $.get("/mail", { mailId: mail.id }, self.chosenMailData);
    }
```

Finally, you can display **chosenMailData** by adding a little more markup to your view:

**Webmail.html**
```html
<!-- Chosen Mail-->
<div class="viewMail" data-bind="with: chosenMailData">
    <div class="mailInfo">
        <h1 data-bind="text: subject"></h1>
        <p><label>From</label>: <span data-bind="text: from"></span></p>
        <p><label>To</label>: <span data-bind="text: to"></span></p>
        <p><label>Date</label>: <span data-bind="text: date"></span></p>
    </div>
    <p class="message" data-bind="html: messageContent" />
</div>
```

Now if you click on a mail, you should see it appear on the screen. Notice the use of the **html** binding, which allows any linebreaks or HTML markup in the mail content to be displayed on-screen (we're making the server responsible for ensuring the mails are stripped of any malicious content).
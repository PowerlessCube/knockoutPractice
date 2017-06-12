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

If you run the application, you should have a bullet-pointed list. That's nice and semantic, but not very attractive! Improve the styling by adding the folders class to your `<ul>`:

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

Next you need to update your bindings, so that if the visitor clicks on a row in the mails grid, your viewmodel loads the corresponding mail. First use the **click** binding on the `<tr>` elements:

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

## Enabling Client-side Mavigation

There are many open source libraries for doing client-side navigation (e.g., with URL hases or pushState). Any of them should fit nicely alongside Knockout. For this tutorial, we'll use **sammy.js** because it gives an easy way to define client-side URL patterns, as you'll see.

The basic technique we'll use is adding an extra layer of indirection. Previously, the **goToFolder** and **goToMail** functions directly triggered Ajax requests and updated the viewmodel state. But now, we'll change **goToFolder** and **goToMail** so that they merely trigger client-side navigation. Separately, we'll use **Sammy** to detect client-side navigation and then do the Ajax requests and update the viewmodel state. This indirection means that if the user triggers client-side navigation by a different means (e.g., clicking back), the corresponding viewmodel updates will still occur.

Start by adding a reference to sammy.js at the top of your view:

**Webmail.html**
```html
<script src="/scripts/lib/sammy.js" type="text/javascript"></script>
```

Next, reduce your **goToFolder** and **goToMail** functions to the following, so that they merely trigger client-side navigation:

**WebmailViewModel.js**
```javascript
// Behaviours
self.goToFolder = function(folder) { location.hash = folder };
self.goToMail = function(mail) { location.hash = mail.folder + '/' + mail.id };
```

Notice that we're using client-side URLs of the form ```#<foldername>``` and ```#<foldername>/<mailid>```. All we have to do now is use **Sammy** to catch navigation to these types of URLs, and invoke our previous logic for loading the corresponding data via an Ajax request. Configure **Sammy** as follows:

**WebmailViewModel.js**
```javascript
function WebmailViewModel() {
    // ... leave everything else unchanged ...   

    // Client-side routes    
    Sammy(function() {
        this.get('#:folder', function() {
            self.chosenFolderId(this.params.folder);
            self.chosenMailData(null);
            $.get("/mail", { folder: this.params.folder }, self.chosenFolderData);
        });

        this.get('#:folder/:mailId', function() {
            self.chosenFolderId(this.params.folder);
            self.chosenFolderData(null);
            $.get("/mail", { mailId: this.params.mailId }, self.chosenMailData);
        });
    }).run();

    // ... leave everything else unchanged ... 
};
```

The first block matches URLs of the form `#<foldername>;` the second matches URLs of the form  `#<foldername>/<mailid>`. The logic inside is just the same as your previous **goToFolder** and **goToMail** functions — they use an Ajax request to update the viewmodel.

Your view is already set up to display the results, so try it: you should now be able to navigate around and see the URL updating. If you're running Chrome, Firefox, or Safari, you'll also be able to use the browser's back and forwards buttons to retrace and replay your steps through the folders.

## Supporting bookmarking / deep linking

Your code almost supports bookmarking and deep linking already. The only thing wrong is that, when the page first loads, it forcibly redirects to the Inbox, regardless of the requested URL. Let's fix that.

First, **remove** the lines that force redirection to the Inbox.

**WebmailViewModel.js**
```javascript
// REMOVE the following two lines now:
// Show inbox by default
self.goToFolder('Inbox');
```

Instead, we'll make the Inbox appear by default *only if* the visitor has an empty client-side URL. Add to your Sammy routing configuration:

**WebmailViewModel.js**
```javascript
// Client-side routes    
Sammy(function() {
    // ... leave the existing two routes unchanged ...

    this.get('', function() { this.app.runRoute('get', '#Inbox') });
}).run();
```
Using **runRoute** like this means that the empty client-side URL will be treated the same as **#Inbox**, i.e., it will load and display the Inbox.

That does it! Now visitors can not only navigate around by clicking on folders and mails, they can also use their back/forward buttons and bookmark or share links just the same as if they were navigating through server-generated pages. And because the UI rendering is all client-side, only raw JSON data is being transmitted over the wire. This is dramatically more efficient than loading a complete new HTML page from the server after every click, leading to a much more engaging and native-like user experience.

## Summary

Knockout and the MVVM pattern fit naturally alongside libraries for working with client-side navigation. Whenever a client-side navigation occurs, you update your viewmodel, and the UI will correspondingly update automatically. This is cleaner, easier, and more robust than manually writing code to update many parts of your DOM every time navigation occurs.

This example focused on client-side navigation, so it hardly made use of Knockout features at all. The data was read-only, and user interactivity was limited to navigation through static data, so we merely used Knockout as a kind of client-side HTML templating system. That, of course, is not the whole story: the real value is that you can also bring in richer Knockout features (such as **custom bindings**, or **editable collections**) and they will work exactly the same within client-side navigation as without it. This kind of architectural clarity and flexibility enables you to scale up to handle real-world complexity without your code becoming unclear or impractical.

In case you want to see the webmail example running full-screen (and outside an `<iframe>`), [here's a standalone finished copy](http://learn.knockoutjs.com/WebmailExampleStandalone.html).
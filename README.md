# Coding Challenge: WP Engine Bio Box
Author box with color options.

## Problem Statement 
⬜️ The goal of this coding exercise is to create a WordPress plugin that leverages React, the WordPress Block API, and the REST API of your local development site to create a custom block that, when placed in the content of a post or page, will display a user profile box.
 
✅ While the box should, by default, display the user’s gravatar (via their email address), their display name, and their bio/description.
 
*****************
### Editor UI

✅ editor - render a representation of what the block content will look like in the front end view.

❌ The user should be able to choose the profile they want to display using a dropdown of the active accounts with a role of author, editor, or administrator. 

✅ The dropdown should be populated using the REST API.

✅ The user should be able to choose the box background and text color using the native color picker component.

❌ The user should be able to toggle on/off each of the default components: gravatar, display name, and bio/description.

************************
### Front-end UI

❌ The block content should display user information (gravatar, display name, bio) as specified in the Editor UI.

✅ The block content  should be rendered using the colors selected by the user in the Editor UI.

✅ Other styles should be inherited from the theme.


************************************
### Installation Instructions
Requires WordPress 5.x and the WordPress REST API *enabled*

#####
🏠 Local 
- used cloned local development environment (preferred)
- test plugin (Hello World post)
⬜️ - tested in Local... *(**************)

######
🏗 Docker 
- Create a new WordPress dev environment, 
- Open up your shell for this Docker image
- navigate to plugins directory
- `git clone` the repo
- `cd` into the repo directory
- run `npm install` to install dependencies
- import posts 
    - Tools > import
    - Install the WordPress importer if it is not installed
    - Import data.xml from the plugin directory ~// TODO: Does this work?~
- test plugin
    - Add a new post
    - Add the WP Engine Bio block
    - rejoice

- ⬜️ Tested in Docker *(**********)

******************************
### Caveats
**Exclusivity:** 
Only one bio box is allowed per page with this implementation.
This was done to simplify with development during the block.
There are use cases for including multiple bio blocks on the same page (About us).

**Gravatar** 
In order for the Gravatar to display, the block creator must have a Gravatar set up with the email they are using to log into this WordPress installation.

Learn more and make your Gravatar [here](http://gravatar.com)

**Bio Description:** 
In order for the bio field to show up, the block creator must have a bio or user description.

**Bio Name:** 
To change which name displays for your bio
- change your nickname 
- change your display name setting in your WordPress user profile

************************************
### TODO 
⬜️ Toggle controls

⬜️ Dynamically display user profile  
- `useEffect()` - re-render block when user changes

🔎 ~Audit for PII~
 

🧪 Test

🧳 Full install instructions


************************************
### Troubleshooting

Can't add block in block editor. This usually happens because the plugin package has not been built, installing all of the necessary Node modules to run the application in the browser.

#### Hosting
Managed Web Posts / Local (shell access)
- Build packages: You'll have to run `npm install` from the plugin root directory 
- Run npm? Is it necessary to run `npm start` to start the package manager?

Shared Web Host (no shell access)
- On a shared host, you will need to get your hosting provider to do this

***************
### Features and or Bugs

⚠️ If user doesn't have a Gravatar,
- [FALLBACK]    to uploaded profile pic on WordPress user profile
- [DEFAULT]     to Gravatar package default monster
- [FEATURE]     Allow user to upload an image to use from plugin interface
- [FEEDBACK]    Discuss "ratings" for Gravatar - currently un-restricted (G, PG, F, etc)

⚠️ Nothing displayed if user hasn't set their bio/description
[FEATURE]     Show message that no bio is set, allow to edit bio from plugin interface

⚠️ Name might display username if a preferred name hasn't been set
[FEATURE]     Allow user to set preferred display name from plugin interface

[HOSTING]     May not work on web hosts without ssh/shell access

🚀 Build package and deploy as plugin?
- Make sure to ship with polyfills for older browsers

🕋 Figure out how to bundle dependencies with plugin
- WordPress downloads, extracts and installs all libraries on plugin install

📦 Create `wp-env` local development/block demo

🕋 Shared Web Hosts 
- have plugin extract dependencies and install automatically

*******
### Release Notes
Version 1.2.1 - Initial Block Plugin features for review
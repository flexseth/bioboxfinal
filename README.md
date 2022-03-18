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


### Dev environment 
- Create a new WordPress dev environment in Local 
- Open Shell
- `git clone` the block repo
- `cd` into the repo directory
- `npm install` to install dependencies
- `npm start` - package block files

### Create Users, Posts, tests
In Local, right click the site you have installed the plugin on. Select Open Site Shell. From thecommand line, enter the following commands to generate your three users. Please note these commands will not work in the normal filesystem, you must go to the Site Shell in Local (which should load in Terminal)

##### Create Nathan Rice via wp-cli
`
wp user create --user-login="Nathan Rice" --user-email="Nathan.Rice@WPEngine.com"
--role="administrator" --display_name="Nathan Rice" --user_pass="password" --description="Prorofessional button masher. Fiercely defensive '90s kid. Recovering political junkie. Not even internet-famous."
`

##### Create Brian Gardner via wp-cli
`wp user create --user-login="Brian Gardner" --user-email="Brian.Gardner@WPEngine.com"
--role="author" --display_name="Nathan Rice" --user_pass="password" --description="Prorofessional button masher. Fiercely defensive '90s kid. Recovering political junkie. Not even internet-famous."
`

##### Create an administrator for your site
`wp user create --user-login="admin" --user-email="hireme@wpengine.com" --role="administrator" --user_pass="password" --display_name="Captain Admin" --description="Applicant for Software Engineer II at WP Engine"
`

### Import posts, map to authors
Import content from WordPress Dashboard
- Tools > import
- Install the WordPress importer if it is not installed
- Import import-content.xml from the plugin directory 
- Map import fields to users
- test plugin
    - Check current posts
    - Add a new post w/WP Engine Bio block
    - rejoice (but see caveats and ...read more...)

### Caveats
**Exclusivity:** 
Only one bio box is allowed per page with this implementation.
This was done to simplify with development during the block.
There are use cases for including multiple bio blocks on the same page (About us).

**Gravatar** 
A default WordPress Avatar will display if the user has not set up their Globally Recognized Avatar (Gravatar). In order for the Gravatar to display, the block creator must have a Gravatar set up with the email they are using to log into this WordPress installation. If this is correct, when you add yourself as a user to the website should pull your Gravatar into the Users page in the Dashboard. 

Learn more and make your Gravatar [here](http://gravatar.com)

**Bio Description:** 
In order for the bio field to show up, the block creator must have a bio or user description.

**Bio Name:** 
To change which name displays for your bio
- add a nickname in your WordPress user profile
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
- **FALLBACK**    to uploaded profile pic on WordPress user profile
- **DEFAULT**     ~~to Gravatar package default monster~~ WordPress default user avatar
- **FEATURE**     Allow user to upload an image to use from plugin interface
- **FEEDBACK**    Discuss "ratings" for Gravatar - currently un-restricted (G, PG, F, etc)

⚠️ Nothing displayed if user hasn't set their bio/description
 - **FEATURE**     Show message that no bio is set, allow to edit bio from plugin interface

⚠️ Name might display username if a preferred name hasn't been set
- **FEATURE**     Allow user to set preferred display name from plugin interface


- **HOSTING**     
-  May not work on web hosts without ssh/shell access
- 🦺 web host would have to manually install ... or...

🚀 Build package and deploy as plugin
- Make sure to ship with polyfills for older browsers
- This is the way... but I've never done it before
- All the everything
- Figure out how to bundle dependencies with plugin
WordPress downloads, extracts and installs all dependencies on plugin install

📦 Create `wp-env` local development/block demo

🕋 Shared Web Hosts 
- have plugin extract dependencies and install automatically

*******
### Release Notes
Version 1.2.1 - Initial Block Plugin features for review
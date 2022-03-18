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

### Requirements
- Local
- Node, NPM, NPX
- Git

### Dev environment 
- Create a new WordPress dev environment in Local 
- Right click the dev environment and select Open Site Shell
- Navigate to the plugins directory of this install
- `git clone` the block repo
- `cd` into the repo directory
- `npm install` to install dependencies
- `npm start` - package block files

### Create Users, Posts, tests
In Local, right click the site you have installed the plugin on. Select Open Site Shell. From thecommand line, enter the following commands to generate your three users. Please note these commands will not work in the normal filesystem, you must go to the Site Shell in Local (which should load in Terminal)

##### Create an administrator for your site
`wp user create --user-login="admin" --user-email="hireme@wpengine.com" --role="administrator" --user_pass="password" --display_name="Captain Admin" --description="Applicant for Software Engineer II at WP Engine"
`

##### Create Nathan Rice via wp-cli
`
wp user create "Nathan Rice" "Nathan.Rice@WPEngine.com" --role="administrator" --user_pass="password" --nickname="Nathan Rice" --description="Prorofessional button masher. Fiercely defensive '90s kid. Recovering political junkie. Not even internet-famous."
`

##### Create Brian Gardner via wp-cli
`wp user create "Brian Gardner" "Brian.Gardner@WPEngine.com" --display_name="Brian Gardner" --user_pass="password" --description="Designer. #WordPress expert. Taylor Swift fan. Principal Developer Advocate at @WPEngine. Founder of @StudioPress. Creator of @FrostWP." --role="administrator"
`

### Import posts, map to authors
`wp import import.xml --authors="create"`


### Caveats
**Must be admin**
Editor preview only works for admin, a limitation of the users endpoint
- This is a bug, it's documented in the code
- last minute edge case, very fixable

**Exclusivity:** 
Only one bio box is allowed per page with this implementation.
This was done to simplify with development during the block.
There are use cases for including multiple bio blocks on the same page (About Us, Our Sponsors..).


**Gravatar** 
A default avatar will display if the user has not set up their Gravatar. In order for the Gravatar to display, the block creator must have a Gravatar set up with the email they are using to log into this WordPress installation. Users that have Gravatars correctly set up will show their thumbnail in the Users page in the Dashboard. 

Learn more and make your Gravatar [here](http://gravatar.com)

**Bio Description:** 
In order for the bio field to show up, the block creator must have a user description in their WordPress user profile. 

**Bio Name:** 
To change which name displays for your bio
- add a nickname in your WordPress user profile
- change your display name setting in your WordPress user profile

**Tested with...**
WP Engine Themes
✅ Genesis Sample (Genesis Framework) 
✅ Genesis Block Theme (FSE)
✅ Frost 

WordPress Themes
✅ TT1 Blocks ⚠️
✅ Twenty Twenty-one ⚠️
✅ Twenty Twenty
✅ _underscores

⚠️ = blocks don't show up on home page 

**Edge Cases**


************************************
### TODO 
Functionality requirements
⬜️ Toggle controls
- Admin only?

⬜️ Dynamically display user profile  
- `useEffect()` - re-render block when user changes

⬜️ Toggle controls
🔎 ~Audit for PII~

#### Edge Cases
Fix Block Preview for non-Administrators

Case: Block created by any user, another user wants to edit this page. 
Block editor breaks because this user can't access /users/ endpoint,
due to insufficient permissions. When fetching from the API, installed
of assuming to fetch /me, if this block has a user set already 

#### Theme Improvements
🧑‍💻 Add blocks to posts loop
- hook block data into template part

🧳 Full install instructions


************************************
### Troubleshooting

> Can't add block in block editor. 
Make sure plugin is built using NPM and the steps above.
Request support from plugin developer. 


***************
### Features, Improvements, etc

⚠️ If user doesn't have a Gravatar
- **FALLBACK**    to uploaded profile pic on WordPress user profile
- **DEFAULT**     to Gravatar package default monster // WordPress default user avatar
- **FEATURE**     Allow user to upload an image to use from plugin interface
- **FEEDBACK**    Discuss "ratings" for Gravatar - currently un-restricted (G, PG, F, etc)

⚠️ Nothing displayed if user hasn't set their bio/description
 - **FEATURE**    Show message that no bio is set, allow to edit bio from plugin interface

⚠️ Name might display username if a preferred name hasn't been set
 - **FEATURE**     Allow user to set preferred display name from plugin interface


### HOSTING, building the plugin
May not work on web hosts without ssh/shell access
- 🦺 web host would have to manually install ... or...

🚀 Build package and deploy as plugin
- Make sure to ship with polyfills for older browsers
- This is the way... but I've never done it before
- All the everything
- Figure out how to bundle dependencies with plugin
on install, download, extract, include dependencies


🕋 Shared Web Hosts 
- Use production/deployable version of plugin
- currently web host would need to install plugin for you

📦 Other local development environments, config, tools

### etc

💬 Language files needed for translation?

*******
### Release Notes
Version 1.2.1 - Initial Block Plugin features for review.

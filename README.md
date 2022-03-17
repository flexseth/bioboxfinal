# Coding Challenge: WP Engine => Bio Box
Author box with color options and the ability to change the user to feature.

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
- Local - used cloned local development environment, ~install plugins, import posts~
- Docker - Create a new WordPress dev environment, install plugin, import posts (which brings in users)

### Dependencies
##### Install Necessary WordPress Packages
- apiFetch
`npm install @wordpress/api-fetch --save`
- icons
`npm install @wordpress/icons --save` 

##### Install Necessary React Packages
- Gravatar - react-gravatar
`npm install --save react-gravatar`

##### WordPress Installation
In order for the Gravatar to pull for the default block, you must have a Gravatar set up.
Learn more and make your Gravatar [here](http://gravatar.com)

In order for the bio field to show up, the user who creates the block must have a bio or user description.

If you wish the bio name to show a different name, change the display name field on your that user's profile. 

************************************
### Features and or Bugs /// TODO

⚠️ If user doesn't have a Gravatar, currently no fallback. Should fallback to uploaded profile pic or default

⚠️ Nothing displayed if user hasn't set their bio/description

⚠️ Name might display username if a preferred name hasn't been set


### TODO 
⬜️  Toggle controls
⬜️  Dynamically display user profile info - `useEffect()`?
- Test
- Full install instructions
- Build package and deploy as plugin

### Submission
- Package plugin as a zip and submit to Amy's email
- Do not include PII in source code
- Developers will get source from Github, compile and run
- - Evaluate to ensure it meets criteria in Problem Statement
- - Evaluate for structure, documentation, readability, testability, robustness, and maintainability.

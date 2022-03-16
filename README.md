# wp-engine-custom-author-box
Author box with color options and the ability to change the user to feature.

## Problem Statement 
⬜️ The goal of this coding exercise is to create a WordPress plugin that leverages React, the WordPress Block API, and the REST API of your local development site to create a custom block that, when placed in the content of a post or page, will display a user profile box.
 
✅ While the box should, by default, display the user’s gravatar (via their email address), their display name, and their bio/description.
 

### Editor UI

✅ editor - render a representation of what the block content will look like in the front end view.

❌ The user should be able to choose the profile they want to display using a dropdown of the active accounts with a role of author, editor, or administrator. 

✅ The dropdown should be populated using the REST API.

✅ The user should be able to choose the box background and text color using the native color picker component.
- Implemented via block control (via block supports)

❌ The user should be able to toggle on/off each of the default components: gravatar, display name, and bio/description.


Front-end UI

❌ The block content should display user information (gravatar, display name, bio) as specified in the Editor UI.

✅ The block content  should be rendered using the colors selected by the user in the Editor UI.

✅ Other styles should be inherited from the theme.

### TODO 
- Toggle controls
- Dynamically display user profile info


### Installation Instructions
Install Node/NPM/NPX

Install Necessary WordPress Packages
- components
- icons

- apiFetch
`npm install @wordpress/api-fetch --save`
- element (useEffect)
~ `npm install @wordpress/element --save` ~

#### Install Necessary React Packages
- Gravatar - react-gravatar
`npm install --save react-gravatar`


### FINALIZE
- Package plugin as a zip and submit to Amy's email
- Do not include PII in source code
- Developers will get source from Github, compile and run
- - Evaluate to ensure it meets criteria in Problem Statement
- - Evaluate for structure, documentation, readability, testability, robustness, and maintainability.
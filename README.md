# wp-engine-custom-author-box
Author box with color options and the ability to change the user to feature.

## Problem Statement 
The goal of this coding exercise is to create a WordPress plugin that leverages React, the WordPress Block API, and the REST API of your local development site to create a custom block that, when placed in the content of a post or page, will display a user profile box.
 
While the box should, by default, display the user’s gravatar (via their email address), their display name, and their bio/description.
 

### TODO 
- Leverage [document..]
- - React
- - WordPress REST API
- - Local dev environment
create-block
Uses default theme styles (Meta/etc/schema?) - TwentyTwenty Two/Frostn markup
Editor view (default, change user)
Color changes (box background, text color)
Front-end view

Schema??


### Bugs
- Possible bug with Frost and Sticky Posts, showing old content?


### Installation Instructions
Install Node/NPM/NPX

Install Necessary WordPress Packages
- components
- icons

- apiFetch
`npm install @wordpress/api-fetch --save`
- element (useEffect)
`npm install @wordpress/element --save`

Install Necessary React Packages
- Gravatar - react-gravatar
`npm install --save react-gravatar`


### FINALIZE
- Package plugin as a zip and submit to Amy's email
- Do not include PII in source code
- Developers will get source from Github, compile and run
- - Evaluate to ensure it meets criteria in Problem Statement
- - Evaluate for structure, documentation, readability, testability, robustness, and maintainability.

### Workarounds
- Frost theme: Switched to Gutenberg Starter theme
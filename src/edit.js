/** WordPress Dependencies */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Block controls
 * @returns {Object} layout components for the Block Editor sidebar
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/block-controls-toolbar-and-sidebar/
 */
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";

/**
 * Managing component state and rendering
 * @see https://reactjs.org/docs/hooks-state.html
 * @see https://reactjs.org/docs/hooks-effect.html
 */
import { useState, useEffect } from "@wordpress/element";

/**
 * WordPress REST API
 * @see https://developer.wordpress.org/rest-api/
 */
import apiFetch from "@wordpress/api-fetch";
/* end WordPress dependencies */

/** External Dependencies */

/**
 * Gravatar component for React
 * @see https://www.npmjs.com/package/react-gravatar
 */
import Gravatar from "react-gravatar";

/* end dependencies */

/**
 * WordPress Engine Custom Bio Box
 * Creates interface for the block preview and controls
 *
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = (props) => {
  // block wrapper, class names and other things
  const blockProps = useBlockProps();

  // access block attributes
  const {
    attributes: { isLoaded, user, users },
  } = props;

  // error catching for fetch()
  const [error, setError] = useState(null);

  console.log(props.attributes);

  // mount component with React Hooks
  useEffect((user) => {
    // if( props.attributes.isLoaded ) return
    if (props.attributes.user !== undefined) return;
    // we already have a default set for this bio
    console.log("Made it past undefined check");

    // ... otherwise, initialize block as me (default display)
    apiFetch({ path: "/wp/v2/users/me" }).then(
      (user) => {
        props.setAttributes({ user: user });
        // don't set isLoaded, we have more possibly to do
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setError(error);
        console.log(error);
        props.setAttributes({ isLoaded: true });
      }
    );
  }, []); // probably why the preview is buggy as non-admin
  // will this always invalidate, because

  // fetch users that are author, editor, or admin
  useEffect((users) => {
    console.log(props.attributes.user);
    apiFetch({ path: "/wp/v2/users?roles=author,editor,administrator" }).then(
      (users) => {
        props.setAttributes({ users });
        props.setAttributes({ isLoaded: true });
      },
      (error) => {
        setError(error);
        console.log(error);
        props.setAttributes({ isLoaded: true });
      }
    );
  }, []);

  // switch users
  function handleChangeUser(newUserName) {
    // TODO: Implement user switcher - for website admins only
    // TODO: -- useEffect, re-rendering when this value changes...
    // TODO: -- or setAttributes to see if the component re-renders?
    /**
		 * @params		new selected user's name
		 * @returns		{ Object } user to re-render in editor
		 * @expected  AJAX like page refresh of component
		const newSelectedUser = (props) => {
			setAttributes (
				user: users.filter( by display name ) // editor re-render?
				// TODO: persist state of user selector
		 } // probably need to do something fancy here
		 */
    // TODO: user switcher business logic - fixable with time
    // TODO: try using SelectControl
    // end user selector
  }

  // start component render
  if (error) {
    // fetching data failed
    return <div>Error: {error.message}</div>;
  } else if (!props.attributes.isLoaded) {
    // fetching data from API
    return <div>Loading...</div>;
  } else {
    // data loaded, let's go!
    return (
      <div {...blockProps}>
        {/* Block Settings */}
        <InspectorControls props={props}>
          <PanelBody title={__("Select User")}>
            {/*
             *
             * 	// TODO: user switcher
             * --- outputs a user list, only
             * --- TODO: asynchronous update of new user bio
             *
             */}
            {() => {
              if (props.attributes.isLoaded && props.attributes.users.length) {
                return;
              }

              // user can render user switcher
              <select props={props} onChange={handleChangeUser}>
                {props.attributes.users.map((user) => (
                  <option key={user.id}>{__(user.name, "bioboxfinal")}</option>
                ))}
              </select>;
            }}{" "}
            {/* end User Switcher */}
            {/* Toggle Displays */
            /*
             * 	// TODO: 	implement toggle functionaly for features
             *		// TODO:  I didn't spend any time on this
             *		// TODO:	please hire me
             */}
          </PanelBody>
        </InspectorControls>
        {/* end block settings */}

        {/* Block Preview */}
        <div className="bio-box">
          <Gravatar email={props.attributes.user.user_email} size={150} />
          <h2>{__(props.attributes.user.name, "bioboxfinal")} </h2>
          <p>{__(props.attributes.user.description, "bioboxfinal")}</p>
        </div>
      </div> // end div ...blockProps
      // component rendered
    );
  }
}; // end WordPress Engine Custom Bio Box

export default Edit;

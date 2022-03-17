/** 
 * WordPress Dependencies 
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/** 
 * Block controls for allowing settings in the block editor side panel
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components'
/**
 * Managing component state and rendering
 */
import { useState, useEffect } from '@wordpress/element'
/**
 * Data tools
 */
import apiFetch from '@wordpress/api-fetch'
/** 
 * External Dependencies 
 */
import Gravatar from 'react-gravatar'

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {
	const blockProps = useBlockProps();
	const {
		attributes: { isLoaded, user, users }
	} = props

	// Fetch data from users endpoint
	const [error, setError] = useState(null);

	// Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
	// fetch user who created block
    useEffect( (user) => {        
		apiFetch( { path: '/wp/v2/users/me' } )
        .then ( 
            ( user ) => {
				props.setAttributes( {user: user} )	
            }, 
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setError(error)
				props.setAttributes( {isLoaded: true} )
                console.log("ERROR: ", error    )
            }
        );
    }, [])

	// fetch users that are author, editor, or admin
	useEffect( (users) => {
			apiFetch( { path: '/wp/v2/users?roles=author,editor,administrator' } )
			.then ( 
				(users) => {
					props.setAttributes( {users: users} )
					props.setAttributes( {isLoaded: true} )
				}, 
				(error) => {
					props.setAttributes( {isLoaded: true} )
					setError(error)
				}             
			);
	}, [])	

	// switch users
	function handleChangeUser(newUserName) {
		// TODO: Implement dynamic view for editor (user switcher)
		// TODO: -- useEffect, checking when the user has changed to re-render?

		// props.setAttributes( {user: newUserName} ) 
		// -- doesn't work because we are receiving a string (Name) value, not an object
		//
		// Need to filter the users array by Name, which we get as a value in the parameter newUserName
		// const newUser = users.filter( filter terms ) 
		// --- this should return a single object that is the user whose name matches newUserName.target.value
		// --- by searching the users array for the record with matching name (display name)
		//
		// TODO: implement user switcher business logic
		// TODO: try using SelectControl, experimental Gutenberg component for more out of the box functionality
	}
	
	// start component render
	if (error) { 
		// couldn't fetch data
		return <div>Error: {error.message}</div>
	}
	else if (!props.attributes.isLoaded ) { 
		// waiting for data to return from API fetch
		return <div>Loading...</div>
	}

	else { // data loaded, let's go! 
		return (
			<div {...blockProps}>
		
				{ /* Block Settings */ } 
				<InspectorControls props={props}>
					<PanelBody title={__("Select User")}>
										
						{ 
						   /*
							* 
							* // TODO: user switcher presentation
					        * --- the component below outputs a user list but nothing more
							*/
						}
	
						<select 
							props={props}
							onChange={ handleChangeUser }>  
							{ 
								props.attributes.users.map( ( user ) => (
								<option 
									key={ user.id }
									>
									{ __(user.name, "bioboxfinal")  }
								</option>
								))
							}
						</select>

						{
							/*
							*
							* 	// TODO: implement toggle functionaly as panel 
							*/ 
						}

					</PanelBody>
				</InspectorControls>
				{ /* end block settings */}

				{ /* Block Editor Display */ } 
				<div className="bio-box">
					<Gravatar email={props.attributes.user.user_email} size={150} />
					<h2>{ __(props.attributes.user.name, "bioboxfinal") } </h2>
					<p>{ __(props.attributes.user.description, "bioboxfinal") }</p>
				</div>

			</div> // end ...blockProps	
			// component rendered
		);
	}
}

export default Edit

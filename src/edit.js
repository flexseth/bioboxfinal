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

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components'

import UserSelector from './UserSelector.js'
import { useState, useEffect } from '@wordpress/element'
import apiFetch from '@wordpress/api-fetch'
import Gravatar from 'react-gravatar'

import {
    SlotFillProvider,
    Slot,
    Fill,
    Panel,
} from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {

	// set a timeout so the REST API can load users....
	// this should resolve all issues

	///////////////////////////////////////

	const blockProps = useBlockProps();
	const {
		attributes: { isLoaded, user, users }
	} = props

	// Fetch data from users endpoint
	const [error, setError] = useState(null);

	// Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect( (user) => {        
		apiFetch( { path: '/wp/v2/users/me' } )
        .then ( 
            ( user ) => {
				props.setAttributes( {user: user} )
				console.log("user.....", user)
	
            }, 
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setError(error)
				props.setAttributes( {isLoaded: true} )
                // props.setAttributes( {isLoaded: true} )
                // setAttributes( {isLoaded: true} )
                console.log("ERROR: ", error    )
            }
        );
    }, [])

	useEffect( (users) => {
			apiFetch( { path: '/wp/v2/users?roles=author,editor,administrator' } )
			.then ( 
				(users) => {
					props.setAttributes( {users: users} )
					props.setAttributes( {isLoaded: true} )

					console.log("users......", users)
				}, 
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					props.setAttributes( {isLoaded: true} )
					setError(error)
				}             
			);
	}, [])	

	// {console.log("[attributes]: ", props.attributes)}
	// {console.log("[user]: ", props.attributes.user)}
	
	if (error) {
		return <div>Error: {error.message}</div>
	}
	else if (!props.attributes.isLoaded ) {
		return <div>Loading...</div>
	}

	
	else { 
		const bio = props.attributes.user // shorten access to variable
		// API loaded, return bio box (otherwise it throws a damn fit)
		// trying to display data in the DOM before it was loaded - it exploded
		// trying to display data in the console before it was loaded, it just said undefined
		return (
			<div {...blockProps}>
		
				{ /* Block Settings */ } 
			
					<InspectorControls props={props}>
						<PanelBody title={__("Select User")}>
				
					{/* {console.log("From panel body.........")}
							{ console.log(props) } */}
							
								{/* <select 
									props={props}
									onChange={ handleChangeUser }>
									{ 
										props.attributes.users.map( ( user ) => (
										<option 
											key={ user.id }
											>
											{ user.name }
										</option>
										))
									}
								</select> */}


						</PanelBody>
					</InspectorControls>
				{ /* end block settings */}


				{ /* Block Editor Display */ } 

						{/* {
							(props) => {
								if(!props.attributes.isLoaded) {
									return <p>Loading...</p>
								}
								else {
									return (
										<div className="bio-box">
											<Gravatar email={props.attributes.user.user_email} size={150} />
											<h2>{ props.attributes.user.name}</h2>
											<p>{ props.attributes.user.description }</p>
										</div>
									)
								}
							}
						} */}


						<div className="bio-box">
							<Gravatar email={bio.user_email} size={150} />
							<h2>{ bio.name}</h2>
							<p>{ bio.description }</p>
						</div>

			</div> // end <div ...blockProps>
			
		);
	}

}

export default Edit

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

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {

	///////////////////////////////////////

	const blockProps = useBlockProps();
	const {
		attributes: { isLoaded, user, users }
	} = props

	// console.log(props)

	////////////////////// 
	// WORKING BLOCK PROPS

	const onChangeUser = (newUser) => {
		console.log("[onChangeUser] user === : ", props.attributes.user)	
		props.setAttributes( {user: newUser})
		console.log("[onChangeUser] after set attributes====: ", props.attributes.user)
	}

	function onChangeInput(props, newInput) {
		console.log(props)
		props.setAttributes({isLoaded: true})
	}

	const changeSetAttributes = () => { 
		props.setAttributes( {isLoaded: true} )
		console.log("isLoaded: ", props.attributes.isLoaded)
	}

	// output of component
	function bio(user) {
		return (
			<section props={props}>
					<Gravatar email={props.attributes.user.user_email} size={150} />
					<h2>{ props.attributes.user.name}</h2>
					<p>{ props.attributes.user.description }</p>
				</section> 	
		)
	}



	const [error, setError] = useState(null);
    // const [featuredUser, setFeaturedUser] = useState()
    // const [users, setUsers] = useState([])
    // const [isLoaded, setIsLoaded] = useState(false)

	// Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect( (user) => {        
        
		apiFetch( { path: '/wp/v2/users/me' } )
        .then ( 
            ( user ) => {
				// props.setAttributes( {isLoaded: true} )
				props.setAttributes( {user: user} )

	
				console.log( props.attributes.isLoaded )
                console.log( props )
                console.log("Display name: ", user.name)
                console.log("Bio: ", user.description)
                console.log("Email: ", user.user_email)
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
				props.setAttributes( {isLoaded: true} )
				props.setAttributes( {users: users} )
				console.log("Other users", users)
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

	{console.log("[attributes]: ", props.attributes)}
	{console.log("[user]: ", props.attributes.user)}
	
	if (error) {
		return <div>Error: {error.message}</div>
	}
	else if (!props.attributes.isLoaded) {
		return <div>Loading...</div>
	}
	
	else { // API loaded, return fields (otherwise it throws errors)
		
		return (
		<div {...blockProps}>
		
		{ /* Block Settings */ } 
		{
			<InspectorControls>
				<PanelBody title={__("Select User")}>
					
				<select onChange={handleChangeUser}>
                         <option key={props.attributes.user.id}>
                             {props.attributes.user.name}
                         </option>
				</select>	
					
				</PanelBody>
			</InspectorControls>
		}	

		{ /* Block Editor Display */ } 
			<Gravatar email={props.attributes.user.user_email} size={150} />
			<h2>{ props.attributes.user.name}</h2>
			<p>{ props.attributes.user.description }</p>
			</div> 
			
		);
	}

}

export default Edit

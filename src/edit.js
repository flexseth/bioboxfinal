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

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ( props ) => {

	function showAttributes(props) {
		console.log("End of Edit() -- Attributes: ", props)
	}

	const blockProps = useBlockProps();
	const {
		attributes: { isLoaded, user, users }
	} = props

	console.log(props)

	props.setAttributes ( {isLoaded: true})
	console.log(props.attributes.isLoaded)


	const [error, setError] = useState(null);
    // const [featuredUser, setFeaturedUser] = useState()
    // const [users, setUsers] = useState([])
    // const [isLoaded, setIsLoaded] = useState(false)

	// Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect( (props) => {        
        apiFetch( { path: '/wp/v2/users/me' } )
        .then ( 
            ( props ) => {
                // console.log("isLoaded: ", props.attributes.isLoaded)
                // setIsLoaded(true)
                console.log("Before setUser function: ", props.user)
                // setUser(props.user)
                console.log("After setUser function: ", props.user)
                console.log("Display name: ", props.user.name)
                console.log("Bio: ", props.user.description)
                console.log("Email: ", user.user_email)
            }, 
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setError(error)
                setIsLoaded(true)
                // props.setAttributes( {isLoaded: true} )
                // setAttributes( {isLoaded: true} )
                console.log("ERROR: ", error    )
            }
        );
    }, [])

	function onChangeInput(props, newInput) {
		console.log(props)
		props.setAttributes({isLoaded: true})
	}

	const changeSetAttributes = () => { 
		attributes.setAttributes( {isLoaded: true} )
	}

	return (

		<div {...useBlockProps()}>

		{
			<InspectorControls>
				<PanelBody title={__("Select User")}>
					{/* do stuff */}
					{/* <UserSelector props={props} /> */}
					<input onChange={ changeSetAttributes } type="text" />

					
				</PanelBody>
			</InspectorControls>
		}

			{__('WP Engine Bio Block – hello from the editor!', 'wpenginebio')}

			<showAttributes />
		</div>
	);

}

export default Edit

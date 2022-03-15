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

	return (

		<div {...useBlockProps()}>

		{
			<InspectorControls>
				<PanelBody title={__("Select User")}>
					{/* do stuff */}
					<UserSelector props={props} />
				</PanelBody>
			</InspectorControls>
		}

			{__('WP Engine Bio Block – hello from the editor!', 'wpenginebio')}

			<showAttributes />
		</div>
	);

}

export default Edit

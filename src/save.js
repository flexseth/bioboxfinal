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

import Gravatar from 'react-gravatar'


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
const save = ( props ) => {
	const blockProps = useBlockProps.save();
	const {
		attributes: {
			isLoaded, user, users
		}
	} = props
	return (
		<div {...blockProps} >
			<Gravatar email={props.attributes.user.user_email} size={150} />
			<h2>__({ props.attributes.user.name}, "bioboxfinal")</h2>
			<p>__({ props.attributes.user.description }, "bioboxfinal")</p>
		</div>
	);
}

export default save

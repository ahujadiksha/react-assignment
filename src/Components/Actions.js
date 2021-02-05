import React from 'react';
import { Card } from 'react-bootstrap';
import * as Icon from 'bootstrap-icons-react';

const Actions = (props) => {
	return (
		<Card.Footer>
			<Card.Link
				className='text-danger'
				onClick={(event) => props.favourite(event, props.user._id)}
			>
				{props.user.favourite ? <Icon.HeartFill /> : <Icon.Heart />}
			</Card.Link>
			<Card.Link onClick={(event) => props.edit(event, props.user._id)}>
				<Icon.PencilSquare />
			</Card.Link>
			<Card.Link onClick={(event) => props.delete(event, props.user._id)}>
				<Icon.Trash />
			</Card.Link>
		</Card.Footer>
	);
};
export default Actions;

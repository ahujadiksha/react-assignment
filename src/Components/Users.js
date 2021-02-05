import React, { useState, useEffect } from 'react';
import { Container, Row, Card, CardGroup } from 'react-bootstrap';
import * as Icon from 'bootstrap-icons-react';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Actions from './Actions';
import { BEARER_TOKEN, Encrypt } from '../Constants';

const Users = (props) => {
	const history = useHistory();
	const [users, setUsers] = useState([]);
	/**
	 * Get all the users
	 */
	const getUsers = () => {
		fetch('data.json', {
			headers: {
				Authorization: BEARER_TOKEN,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				setUsers(myJson);
			});
	};
	// End

	useEffect(() => {
		getUsers();
	}, []);

	/**
	 * Edit User
	 */
	const editUser = (event, _id) => {
		event.preventDefault();
		history.push(`user/${Encrypt(_id)}`);
	};
	// End

	/**
	 * Delete User
	 */
	const deleteUser = (event, _id) => {
		event.preventDefault();
		swal({
			title: 'Are you sure?',
			text: "Once deleted, you can't be able to recover this user!",
			icon: 'warning',
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				console.log('Deleted!');
			} else {
				console.log('Cancelled!');
			}
		});
	};
	// End

	/**
	 * Set/Unset Favourite User
	 */
	const favouriteToggle = (event, _id) => {
		event.preventDefault();
		const _users = [];
		users.map((user) => {
			if (user._id === _id) {
				_users.push({
					...user,
					favourite: !user.favourite,
				});
			} else {
				_users.push(user);
			}
		});
		setUsers(_users);
	};
	// End

	return (
		<Container>
			<Row md={4}>
				{users &&
					users.length > 0 &&
					users.map((user) => (
						<CardGroup className='mar-bottom-10' key={user._id}>
							<Card className='mar-right-10'>
								<Card.Img variant='top' src={user.img} />
								<Card.Body className='text-left'>
									<Card.Title>{user.name}</Card.Title>
									<Card.Subtitle className='mb-2 text-muted'>
										<Icon.Envelope /> {user.email}
									</Card.Subtitle>
									<Card.Subtitle className='mb-2 text-muted'>
										<Icon.Telephone /> {user.phone}
									</Card.Subtitle>
									<Card.Subtitle className='mb-2 text-muted'>
										<Icon.Globe /> {user.website}
									</Card.Subtitle>
								</Card.Body>
								<Actions
									user={user}
									edit={editUser}
									delete={deleteUser}
									favourite={favouriteToggle}
								/>
							</Card>
						</CardGroup>
					))}
			</Row>
		</Container>
	);
};
export default Users;

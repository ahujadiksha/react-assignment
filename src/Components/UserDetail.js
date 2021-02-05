import React, { useState, useEffect } from 'react';
import { Container, Form, Col, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import { BEARER_TOKEN, Decrypt } from '../Constants';
const UserDetail = (props) => {
	const history = useHistory();
	const [form, setForm] = useState([
		{
			name: 'name',
			label: 'Name',
			type: 'text',
			value: '',
		},
		{
			name: 'email',
			label: 'Email',
			type: 'text',
			value: '',
		},
		{
			name: 'phone',
			label: 'Phone',
			type: 'text',
			value: '',
		},
		{
			name: 'website',
			label: 'Website',
			type: 'text',
			value: '',
		},
	]);
	useEffect(() => {
		const user_id = Decrypt(props.match.params.id);
		fetch(`../data.json`, {
			headers: {
				Authorization: BEARER_TOKEN,
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (users) {
				const user = users.filter((user) => user._id === parseInt(user_id));
				if (user[0]) {
					const updatedForm = [];
					form.map((field) => {
						updatedForm.push({
							...field,
							value: user[0][field.name] ? user[0][field.name] : '',
						});
					});
					setForm(updatedForm);
				}
			});
	}, []);
	const setInput = (event, _field) => {
		const updatedForm = [];
		form.map((field) => {
			if (field.name === _field) {
				updatedForm.push({
					...field,
					value: event.currentTarget.value,
				});
			} else {
				updatedForm.push({
					...field,
				});
			}
		});
		setForm(updatedForm);
	};
	const cancel = (event) => {
		event.preventDefault();
		history.push(`/`);
	};

	return (
		<Container>
			<Form.Group className='mar-top-70'></Form.Group>
			<h4 className='border-bottom'>Edit User Details</h4>
			{form.map((field, indx) => (
				<Form.Group key={indx}>
					<Form.Row>
						<Form.Label column lg={2}>
							{field.label}:
						</Form.Label>
						<Col>
							<Form.Control
								onChange={(event) => setInput(event, field.name)}
								value={field.value}
								type={field.type}
								placeholder={field.label}
							/>
						</Col>
					</Form.Row>
				</Form.Group>
			))}
			<Form.Group>
				<Col className='edit-form-buttons' md={{ offset: 2 }}>
					<Button variant='primary' type='button'>
						Submit
					</Button>
					<Link className='btn btn-secondary' to='/'>
						Cancel
					</Link>
				</Col>
			</Form.Group>
		</Container>
	);
};
export default UserDetail;

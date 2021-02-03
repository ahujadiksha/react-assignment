import React, {useState,useEffect} from 'react';
import { Container, Row, Card, CardGroup  } from 'react-bootstrap';
import * as Icon from 'bootstrap-icons-react';
const Users = (props) => {
	const [users,setUsers]=useState([]);
	const getData=()=>{
		fetch('data.json'
		,{
		  headers : { 
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		   }
		}
		)
		  .then(function(response){
			console.log(response)
			return response.json();
		  })
		  .then(function(myJson) {
			console.log(myJson);
			setUsers(myJson)
		  });
	  }
	  useEffect(()=>{
		getData()
	  },[])
	
	return (
		<Container>
			<Row md={4}>
				{users && users.length > 0 &&  users.map(user => <CardGroup key={user._id}>
					<Card >
						<Card.Img variant="top" src={user.img} />
						<Card.Body style={{ textAlign: 'left' }}>
							<Card.Title>{user.name}</Card.Title>
							<Card.Subtitle className="mb-2 text-muted"><Icon.Envelope /> {user.email}</Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><Icon.Telephone /> {user.phone}</Card.Subtitle>
							<Card.Subtitle className="mb-2 text-muted"><Icon.Globe /> {user.website}</Card.Subtitle>
						</Card.Body>
						<Card.Footer>
							<Card.Link href="#"><Icon.Heart /></Card.Link>
							<Card.Link href="#"><Icon.PencilSquare /></Card.Link>
							<Card.Link href="#"><Icon.Trash /></Card.Link>
						</Card.Footer>
					</Card>		
				</CardGroup>)}
			</Row>
		</Container>
	);
};
export default Users;

import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const Pdf = () => {
  return (
    <Card style={{ width: '100%' }}>
    <Card.Img variant="top" src="https://picsum.photos/200/300.webp" style={{width:"6rem", height:'6rem'}} className='m-3'/>
    <Card.Body>
      <Card.Title className='text-center'>Vehicle Invoice Report</Card.Title>
      <Card.Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, eum.
      </Card.Text>
    </Card.Body>
    <div className='d-flex justify-content-around align-items-center w-full'>

    <ListGroup className="flex-1 w-50">
      <ListGroup.Item>Amount : <strong>$100000</strong></ListGroup.Item>
      <ListGroup.Item>Place : <strong>United Arab Emirates</strong></ListGroup.Item>
      <ListGroup.Item>Last Date : <strong>19-May-2024</strong></ListGroup.Item>
    </ListGroup>
    <ListGroup className="flex-1 w-50">
      <ListGroup.Item>Amount : <strong>$100000</strong></ListGroup.Item>
      <ListGroup.Item>Place : <strong>United Arab Emirates</strong></ListGroup.Item>
      <ListGroup.Item>Last Date : <strong>19-May-2024</strong></ListGroup.Item>
    </ListGroup>
    </div>
  </Card>
  )
}

export default Pdf
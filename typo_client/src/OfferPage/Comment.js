import React from 'react';
import Toast from 'react-bootstrap/Toast';

function Comment({username, date, content}){
  return (
  <Toast className="comment">
    <Toast.Header closeButton={false}>
      <strong className="mr-auto">{username}</strong>
      <small>{date.toString()}</small>
    </Toast.Header>
    <Toast.Body>{content}</Toast.Body>
  </Toast>);
}

export default Comment;

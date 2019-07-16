import React from 'react';
import Form from 'react-bootstrap/Form';
import { FaSort } from "react-icons/fa";
import Button from 'react-bootstrap/Button';

function CommentForm({state, handleSubmit, handleCommentChange, handleSortClick}){

  return (
  <React.Fragment>
    <Form hidden={!state.loggedInUser} onSubmit={handleSubmit} >
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label className="comment-form__caption">Comments</Form.Label>
        <Form.Control 
          onChange={handleCommentChange} 
          disabled={state.isFetchingInsert} 
          value={state.commentText} 
          className="comment__textarea" 
          placeholder="Leave a comment..." 
          as="textarea" 
          rows="3" 
        />
        <div className="clearfix">
          <Button 
            disabled={state.isFetchingInsert || !state.isValidComment} 
            className="comment__submit" 
            variant="primary" 
            type="submit"
          >
            Submit
          </Button>
        </div>
      </Form.Group>
    </Form>
    <hr/>
    <div className="clearfix">
      <div className="comment__sort">
        <button onClick={handleSortClick} className="comment__sort-link">
          <FaSort/>
        </button>
        <span>Sorted by date: {state.ascendingOrder ? "ascending" : "descending"} order</span>
      </div>
    </div>
  </React.Fragment>);
}

export default CommentForm;
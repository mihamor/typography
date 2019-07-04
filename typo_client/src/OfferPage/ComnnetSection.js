import React from 'react';
import Comment from './Comment';

function CommentSection({comments, per_page, page, ascendingOrder}){
  const modifier = ascendingOrder ? -1 : 1;
  comments = comments.sort((a,b) => {
    return modifier * b.data.addedAt.toDate() - modifier * a.data.addedAt.toDate();
  });
  const resultToRender = comments
    .slice((page-1) * per_page, page * per_page)
    .map(comment => 
    <Comment 
      username={comment.data.username} 
      content={comment.data.content}
      date={comment.data.addedAt.toDate()} 
      key={comment.id}
    />);
  return resultToRender;
}

export default CommentSection;
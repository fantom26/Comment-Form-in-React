import Comment from './Comment'
import React from 'react';

const CommentsList = (props) => {

    return (
        <ul className="p-0">
            {
                props.comments.map((item, index) =>
                    <Comment
                        key={index}
                        text={item.text}
                        name={item.name}
                        created_at={item.created_at}
                    />
                )
            }
        </ul>
    )
}

export default CommentsList
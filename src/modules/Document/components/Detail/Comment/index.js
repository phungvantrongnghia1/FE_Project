import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import "./style.less";
const { TextArea } = Input;
const Index = () => {
    const [comments, setComments] = useState(''),
        [submitting, setSubmitting] = useState(false),
        textAreaRef = useRef();
    const handleSubmit = () => {
        if (!textAreaRef.current.textAreaRef.value) {
            return;
        }
        setSubmitting(true);
        setSubmitting(false);
        setComments([
            {
                author: 'Trọng Nghĩa',
                avatar: 'https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p960x960/52179284_2188866038093901_4745850072221089792_o.jpg?_nc_cat=102&_nc_sid=7aed08&_nc_ohc=h50ADhqeBqwAX-jpsDe&_nc_ht=scontent.fsgn2-2.fna&_nc_tp=6&oh=a57cbbf6348919e0d85a746cd448d3c3&oe=5EED5364',
                content: textAreaRef.current.textAreaRef.value,
                datetime: moment().fromNow()
            },
            ...comments
        ])
    };


    const CommentList = ({ comments }) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment {...props} />}
        />
    );
    const Editor = ({ onSubmit, submitting }) => (
        <div>
            <Form.Item>
                <TextArea className="gx-ml-2 gx-w-50" rows={4} ref={textAreaRef} />
            </Form.Item>
            <Form.Item>
                <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                    Add Comment
            </Button>
            </Form.Item>
        </div>
    );
    return (
        <div>
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
                avatar={
                    <Avatar
                        src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/p960x960/52179284_2188866038093901_4745850072221089792_o.jpg?_nc_cat=102&_nc_sid=7aed08&_nc_ohc=h50ADhqeBqwAX-jpsDe&_nc_ht=scontent.fsgn2-2.fna&_nc_tp=6&oh=a57cbbf6348919e0d85a746cd448d3c3&oe=5EED5364"
                        alt="Han Solo"
                    />
                }
                content={
                    <Editor
                        onSubmit={handleSubmit}
                        submitting={submitting}
                    />
                }
            />
        </div>
    )
}
export default Index;
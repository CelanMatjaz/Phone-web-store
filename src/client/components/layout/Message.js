import React from 'react';

const Message = props => {
    return (
        <div className={'message ' + props.type || 'success'}>
            {props.message || '(The \'message\' prop is not passed into this component)'}
        </div>
    );
};

export default Message;
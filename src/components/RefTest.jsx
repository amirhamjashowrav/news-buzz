import React from 'react';

const RefTest = React.forwardRef((_, ref) => {
    return (
        <div>
            <h1 ref={ref} className='jumbotron'>File checking</h1>
        </div>
    );
});

export default RefTest;
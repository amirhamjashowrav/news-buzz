import React from 'react';
import {newsCategory} from '../News/news';

class Header extends React.Component {

    state = {
        searchTerm: ''
    }

    handleChange = event => {
        this.setState ({searchTerm: event.target.value});
    }

    handleKeyPress = event => {
        if(event.key === "Enter"){
            this.props.search(this.state.searchTerm);
        }
    };

    render() {
        const {category, changeCategory} = this.props;
        return (
            <div className = 'my-4'>
                <h1 className = 'mb-4' style = {{fontWeight: '300'}}>
                    News Buzz
                </h1>
                <input 
                    ref={this.props.innerRef}
                    type = 'search'
                    className = 'form-control mb-4'
                    placeholder = 'Type Anything And Press Enter To Search'
                    value = {this.state.searchTerm}
                    onChange = {this.handleChange}
                    onKeyPress = {this.handleKeyPress}
                />
                <div className='my-4'>
                    {newsCategory && 
                        Object.keys(newsCategory).map((item) => {
                        if (category === newsCategory[item]) {
                            return (
                                <button 
                                    onClick={()=> changeCategory(newsCategory[item])}
                                    className = 'btn btn-sm btn-warning me-2 mb-2'>
                                    {`#${newsCategory[item]}`}
                                </button>
                            );
                        }
                        return (
                            <button 
                                onClick={()=> changeCategory(newsCategory[item])}
                                className = 'btn btn-sm btn-light me-2 mb-2'>
                                {`#${newsCategory[item]}`}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
    }
}

 

export default React.forwardRef((props, ref) => <Header {...props} innerRef={ref}/>);
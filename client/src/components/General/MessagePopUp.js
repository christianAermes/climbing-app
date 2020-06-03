import React, {Component} from 'react';

class MessagePopUp extends Component {
    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {
        return (
            <div className="popup-background">
                <div className="popup-message-container sub-container">
                    <p>
                        {this.props.message}
                    </p>
                </div>
            </div>
        )
    }
}

export default MessagePopUp
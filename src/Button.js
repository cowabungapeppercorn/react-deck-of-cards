import React from 'react';

class Button extends React.Component {

  render() {
    return (
      <div className="drawBtn">
        
        {this.props.drawCard ? 
          <button onClick={this.props.drawCard}>Pick a card, any card</button> :
          <button onClick={this.props.shuffle}>Shuffle 'em Up!</button>
        }

      </div>
    );
  }
}

export default Button;
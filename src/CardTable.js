import React from 'react';
import Card from './Card';
import Button from './Button';
import axios from 'axios';
import './CardTable.css';


class CardTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: undefined,
      drawnCards: []
    }
    this.drawCard = this.drawCard.bind(this);
    this.shuffle = this.shuffle.bind(this);
  }

  async componentDidMount() {
    console.log("MOUNTING CARD TABLE");
    let response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    let deck = response.data;
    this.setState({ deck }, () => (
      console.log("STATE OF DECK", this.state.deck)
    ));
  }

  async drawCard() {
    let deckId = this.state.deck.deck_id;
    let response = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
    let newCard = response.data.cards[0];

    this.setState(st => {
      let newRemaining = response.data.remaining;
      let drawnCards = [...st.drawnCards, newCard];
      let deck = { ...st.deck, remaining: newRemaining }
      return { drawnCards, deck };
    });
    console.log("DECK REMAINING NICE!", this.state.deck.remaining)
  }

  async shuffle() {
    let response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    let deck = response.data;
    this.setState({ deck, drawnCards: [] });
  }

  render() {
    let shouldShowShuffle = (!(this.state.deck) || this.state.deck.remaining <= 0);
    const { drawnCards } = this.state;
    return (
      <div className="CardTable">
        <p>This is a card table!</p>

        { shouldShowShuffle ?
          <Button shuffle={this.shuffle} /> :
          <Button drawCard={this.drawCard} />}

        {drawnCards === [] ? <p>LOADING...</p> :
          drawnCards.map(card => (
            <Card image={card.image} alt={card.code} key={card.code} />
          ))
        }
      </div>
    );
  }
}

export default CardTable;
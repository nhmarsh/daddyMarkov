/* eslint-disable no-plusplus */
import React from 'react';
import autoBind from 'react-autobind';
import request from 'superagent';
import {
  constructNewChainFromJokeList,
  GET_JOKE_URL,
} from '../constants/JokeConstants';
import Jokes from './Jokes';

class Root extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentChain: {},
      chainHistory: [],
      errorMessage: '',
      howManyJokes: 4,
      currentIndex: 0,
    };

    this.hasNonDigitRegex = /\D/g;

    autoBind(this);
  }

  componentDidMount() {
    this.getNewChain();
  }

  getNewChain = () => {
    let jokeIndex;
    const { howManyJokes } = this.state;
    const newJokePromises = [];
    const newJokes = [];
    for (jokeIndex = 0; jokeIndex < howManyJokes; jokeIndex++) {
      newJokePromises.push(request.get(GET_JOKE_URL)
        .set('Accept', 'application/json')
        .set('User-Agent', 'https://github.com/nhmarsh')
        .then((response) => {
          newJokes.push(response.body.joke);
        })
        .catch((err) => {
          console.log('Error: ', err);
        }));
    }

    Promise.all(newJokePromises)
      .then(() => {
        this.setState({ currentChain: constructNewChainFromJokeList(newJokes) });
      });
  };

  updateCurrentIndex = (newIndex) => {
    this.setState({ currentIndex: newIndex });
  };

  updateHowMany = (howMany) => {
    if (!howMany) {
      this.setState({ howManyJokes: 1 });
    }
    if (!this.hasNonDigitRegex.test(howMany) && howMany > 0) {
      this.setState({ howManyJokes: howMany });
    }
  };

  render() {
    const {
      currentChain, errorMessage, howManyJokes, currentIndex,
    } = this.state;
    return (
      <div>
        <div>{errorMessage}</div>
        <Jokes
          currentIndex={currentIndex}
          updateCurrentIndex={this.updateCurrentIndex}
          currentChain={currentChain}
        />
        <label htmlFor="newJokeNum">How many?</label>
        <input
          id="newJokeNum"
          type="number"
          value={howManyJokes}
          onChange={event => this.updateHowMany(event.target.value)}
        />
        <button type="button" onClick={this.getNewChain}>
Those are terrible, get me new ones!
        </button>
      </div>
    );
  }
}

export default Root;

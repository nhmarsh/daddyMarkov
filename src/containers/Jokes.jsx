import React from 'react';
import PropTypes from 'prop-types';
import { getNextJokeIndex, JOKE_PROP_TYPE } from '../constants/JokeConstants';

class Jokes extends React.PureComponent {

  nextJoke = () => {
    const { currentChain, currentIndex, updateCurrentIndex } = this.props;
    const nextJokeIndex = getNextJokeIndex(currentChain, currentIndex);
    updateCurrentIndex(nextJokeIndex);
  };

  render() {
    const { currentChain, currentIndex } = this.props;

    if (currentChain.elements) {
      const currentJoke = currentChain.elements[currentIndex];
      return (
        <div>
          <div>{currentJoke}</div>
          <button type="button" onClick={this.nextJoke}>Next!</button>
        </div>
      );
    }

    return <div>Loading, hold on a minute!</div>;
  }
}

Jokes.defaultProps = {
  currentChain: {},
};


Jokes.propTypes = {
  currentChain: PropTypes.shape(JOKE_PROP_TYPE),
  updateCurrentIndex: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
};


export default Jokes;

import PropTypes from 'prop-types';

export const JOKE_PROP_TYPE = {
  id: PropTypes.number.isRequired,
  nextElementProbabilities: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
  elements: PropTypes.arrayOf(PropTypes.string),
};

export const GET_JOKE_URL = 'https://icanhazdadjoke.com/';

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getArrayOfProbabilities = (arraySize) => {
  let currentMax = 100 - arraySize;
  const probs = [];
  for (let i = 0; i < arraySize - 1; i++) {
    const rand = getRandomInteger(1, currentMax - arraySize);
    currentMax -= rand;
    probs.push(rand);
  }
  probs.push(currentMax); // last element has the rest
  return probs;
};

const getMarkovProbabilityChain = jokeList => jokeList.map(() => getArrayOfProbabilities(jokeList.length));

export const constructNewChainFromJokeList = (jokeList) => {
  const newJokeChain = {
    id: 0,
    elements: jokeList,
    nextElementProbabilities: getMarkovProbabilityChain(jokeList),
  };
  return newJokeChain;
};

export const getNextJokeIndex = (jokeChain, currentJokeIdx) => {
  const rand = getRandomInteger(0, 100);
  const probs = jokeChain.nextElementProbabilities[currentJokeIdx];
  let idx;
  let sum = 0;

  for (idx = 0; idx < probs.length; idx++) {
    if (sum < rand && rand < sum + probs[idx]) {
      return idx;
    }
    sum += probs[idx];
  }
};

import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

// Only accepts objects not arrays
const json2mq = obj => {

  const matches = Object.keys(obj).map(k => {
    const hyphenCase = k.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`);

    return `${hyphenCase}: ${obj[k]}px`;
  }).join(',');

  return `(${matches})`;
};

const isMatching = (query, { width, height }) => (
  (query.maxWidth === undefined || width <= query.maxWidth) &&
  (query.minWidth === undefined || width >= query.minWidth) &&
  (query.maxHeight === undefined || height <= query.maxHeight) &&
  (query.minHeight === undefined || height >= query.minHeight)
);

const DIM_TYPE = 'screen';

class Media extends React.Component {

  static propTypes = {
    defaultMatches: PropTypes.bool,
    query: PropTypes.PropTypes.object.isRequired,
    render: PropTypes.func,
    children: PropTypes.func,
  }

  static defaultProps = {
    defaultMatches: true,
  }

  state = {
    matches: this.props.defaultMatches,
  }

  componentWillMount() {
    if (typeof window === 'object' && window.matchMedia) {
      let { query } = this.props;
      query = json2mq(query);
      this.mediaQueryList = window.matchMedia(query);
      this.mediaQueryList.addListener(this._updateMatches);
      this._updateMatches();      
    } else {
      Dimensions.addEventListener('change', this._updateDimMatches);
      this._updateDimMatches({ [DIM_TYPE]: Dimensions.get(DIM_TYPE) });
    }
  }

  componentWillUnmount() {
    if (typeof window === 'object' && window.matchMedia) {
      this.mediaQueryList.removeListener(this._updateMatches);
    } else {
      Dimensions.removeEventListener('change', this._updateDimMatches);
    }
  }

  _updateMatches = () => this.setState({ matches: this.mediaQueryList.matches });

  _updateDimMatches = ({ [DIM_TYPE]: dim }) => this.setState({ matches: isMatching(this.props.query, dim) });

  render() {
    const { children, render } = this.props;
    const { matches } = this.state;

    if (render) {
      return matches ? render() : null;
    } else if (children) {
      return children(matches);
    } else {
      return null;
    }
  }
}

export default Media;

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import { getHomePageData } from '../actions/HomePageAction';

class App extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    if (isEmpty(this.props.data)) {
      this.props.actions.getHomePageData({ tags: 'story' });
    }
  }
  componentDidMount() {
    
  }

  render() {
    console.log('this.props.data', this.props.data)
    return (
      <div>
        REACT REDUX BOILERPLATEs
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    context: state.context,
    data: state.homePageData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    {getHomePageData},
    dispatch,
  ),
});

export default connect(
mapStateToProps,
mapDispatchToProps,
)(App);

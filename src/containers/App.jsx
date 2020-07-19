import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames/bind';
import { getHomePageData } from '../actions/HomePageAction';
import * as styles from  './App.css';

const cx = classNames.bind(styles);
class App extends Component {
  constructor() {
    super();
  }
  componentWillMount() {
    // if (isEmpty(this.props.data)) {
    //   this.props.actions.getHomePageData({ tags: 'story' });
    // }
  }
  componentDidMount() {
    this.props.actions.getHomePageData({ tags: 'story' });
  }

  render() {
    const { data } = this.props;
    return (
      <div className={cx("mainContainer", "col8")}>
        <div className={cx("test")}>REACT REDUX BOILERPLATE
          </div>
          {data && data.hits && data.hits.map((item) => {
            return (
              <p>{item.title}</p>
            )
          })}
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

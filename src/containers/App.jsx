import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor() {
    super();
  }

  static propTypes = {
    data: PropTypes.objectOf(PropTypes.object),
  };

  static defaultProps = {
    data: {},
  };
  componentWillMount() {

  }
  componentDidMount() {

  }

  render() {
    return (
      <div>
        REACT REDUX BOILERPLATEs
      </div>
    );
  }
}

const mapStateToProps = (state) => {
const data = state;
return {
data,
};
};

const mapDispatchToProps = (dispatch) => ({
actions: bindActionCreators(
{},
dispatch,
),
});

export default connect(
mapStateToProps,
mapDispatchToProps,
)(App);

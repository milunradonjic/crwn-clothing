import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from '../collection/collection.container';

// THUNK WAY
// import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

// SAGA WAY
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';


class ShopPage extends React.Component {
  // shorthand for writing contstuctor super call and state
  // state = {
  //   loading: true
  // };

  componentDidMount() {
    // THUNK WAY
    // const { fetchCollectionsStartAsync } = this.props;
    // fetchCollectionsStartAsync();

    // SAGA WAY
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    // render is a method that recives a function whose params are the props that component which will get renderd needs.
    // <Route path={somePath} render={(props) => <Component prop1={props.prop1}>}
    return (
      <div>
        <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionContainer} />
      </div >)
  };
}

const mapDispatchToProps = dispatch => ({
  // THUNK WAY
  // fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())

  // SAGA WAY
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);
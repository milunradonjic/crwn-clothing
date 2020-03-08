import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  // shorthand for writing contstuctor super call and state
  state = {
    loading: true
  };

  componentDidMount() {
    const { updateCollections } = this.props;
    // get collections ref from firestore with id (key) 'collections'
    const collections = firestore.collection('collections');

    // subscribe to listener
    // when the snapshot changes it will fire
    collections.onSnapshot(async snapshot => {
      // transform snapshot to map
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      // put it in a reducer
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    // render is a method that recives a function whose params are the props that component which will get renderd needs.
    return (
      <div>
        <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
      </div >)
  };
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
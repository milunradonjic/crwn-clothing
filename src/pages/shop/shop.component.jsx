import React from 'react';

import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {

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
    })
  }

  render() {
    const { match } = this.props;
    return (
      <div>
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div >)
  };
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);
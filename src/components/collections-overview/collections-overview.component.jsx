import React from 'react';

import './collections-overview.styles.scss';

import CollectionPreview from '../collection-preview/collection-preview.component';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({ collections }) => (
  <div className="collections-overview">
    {
      collections.map(({ id, ...otherCollectionPreviewProps }) => (
        <CollectionPreview key={id} {...otherCollectionPreviewProps} />
      ))
    }
  </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionsForPreview
});

export default connect(mapStateToProps)(CollectionsOverview)
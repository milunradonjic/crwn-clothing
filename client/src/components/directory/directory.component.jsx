import React from 'react';

import { DirectoryContainer } from './directory.styles';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSections } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';


const Directory = ({ sections }) => (
  <DirectoryContainer>
    {sections.map(({ id, ...otherSectionProps }) =>
      (<MenuItem key={id} {...otherSectionProps}></MenuItem>))}
  </DirectoryContainer>
);

const mapStateToProps = createStructuredSelector({
  sections: selectSections
});

export default connect(mapStateToProps)(Directory);
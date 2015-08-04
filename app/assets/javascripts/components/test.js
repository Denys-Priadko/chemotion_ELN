// Example component for collection stores,...
import React from 'react';
import {Button} from 'react-bootstrap';

import CollectionStore from './stores/CollectionStore';
import CollectionActions from './actions/CollectionActions';

class Test extends React.Component {
  constructor() {
    super();
    this.state = CollectionStore.getState();
  }

  componentDidMount() {
    CollectionStore.listen(this.onChange.bind(this));
    CollectionActions.fetchCollections();
  }

  componentWillUnmount() {
    CollectionStore.unlisten(this.onChange.bind(this));
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return(
      <Button bsStyle="success" bsSize="small">
        Something
      </Button>
    );
  }
}

module.exports = Test;

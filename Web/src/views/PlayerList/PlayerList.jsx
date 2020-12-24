import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CompareGrid } from '../../components';

import * as actions from '../../services/player';
import './PlayerList.css';

import { Search } from 'semantic-ui-react';

const initialState = { isLoading: false, results: [], value: '' }

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.state = initialState;
    this.onRemove = this.onRemove.bind(this);

    this.props.getSelectedPlayers()
  }

  onRemove(e) {
    e.preventDefault();
    this.props.removePlayer(e.target.value);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    if (this.state.value.length < 1 && value.length < 1) {
      return this.setState(initialState);
    }

    if (value.length > 2) {
      this.props.searchBasicPlayer(value);
      this.setState({ isLoading: false, value });
    }
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    this.props.searchPlayer(result.title);
    this.props.addPlayer(result.id);
  }

  render() {
    const { selectedPlayers, suggestions } = this.props;
    const { isLoading, value } = this.state;
    return (
      <div>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={suggestions}
          value={value}
        />
        <CompareGrid
          players={selectedPlayers.skaters} 
          skater={true} 
          detailed={true} 
          onDelete={(id) => this.props.deletePlayer(id)}
        />
        <CompareGrid 
          players={selectedPlayers.goalies} 
          skater={false} 
          detailed={true} 
          onDelete={(id) => this.props.deletePlayer(id)}
        />
      </div>);
  }
}

const mapStateToProps = state => ({
  selectedPlayers: state.player.selectedPlayers,
  suggestions: state.player.suggestions,
})

const mapDispatchToProps = dispatch => ({
  getSelectedPlayers: () => dispatch(actions.getSelectedPlayers()),
  removePlayer: (id) => dispatch(actions.removePlayer(id)),
  searchBasicPlayer: (name) => dispatch(actions.searchBasicPlayer(name)),
  searchPlayer: (name) => dispatch(actions.searchPlayer(name, false)),
  addPlayer: (id) => dispatch(actions.addPlayer(id)),
  deletePlayer: (id) => dispatch(actions.deletePlayer(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList);
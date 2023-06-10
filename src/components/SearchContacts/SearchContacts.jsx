import React from 'react';
import './SearchContacts.scss';

export default class SearchContacts extends React.Component {
  state = {
    filter: '',
  };
  handleChange = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value.trim() }); // асинхрон виконається в КІНЦІ!!
    // ------------------------------------
    // this.props.onChange(this.state.filter); // синхронний код виконається ПЕРШИМ!
    // ------------------------------------
    setTimeout(() => this.props.onChange(this.state.filter), 0); // викликаємо після усіх обробок даних
  };

  render() {
    return (
      <label>
        <p>Find contact by name</p>
        <input
          type="text"
          name="filter"
          className="nameField"
          value={this.state.filter}
          onChange={this.handleChange}
          placeholder="Filter contacts..."
        ></input>
      </label>
    );
  }
}

import React from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import './ContactForm.scss';

const DATA_STATE = {
  name: '',
  number: '',
};

export default class ContactForm extends React.Component {
  state = {
    ...DATA_STATE,
  };
  // ****************************************************************
  changeInputValue = evt => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };
  // ****************************************************************
  addContact = evt => {
    evt.preventDefault();
    const { name, number } = this.state;
    //
    const stateName = !name.trim() ? 'empty' : name.trim();
    const stateNumber = number;

    const newContact = { id: nanoid(10), name: stateName, number: stateNumber };
    //----------------------------------
    this.props.onSubmit(newContact);
    //----------------------------------
    this.clearState();
  };

  clearState = () => {
    this.setState({ ...DATA_STATE });
  };
  // **************************************
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  // **************************************

  render() {
    return (
      <form className="contactsForm" onSubmit={this.addContact}>
        <label className="nameLabel">
          Name
          <br />
          <input
            className="nameField"
            type="text"
            name="name"
            value={this.state.name}
            placeholder="Enter contact name"
            onChange={this.changeInputValue}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className="nameLabel">
          Number
          <br />
          <input
            className="nameField"
            type="tel"
            name="number"
            value={this.state.number}
            placeholder="Enter your number"
            onChange={this.changeInputValue}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>

        <button className="conformButton" type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

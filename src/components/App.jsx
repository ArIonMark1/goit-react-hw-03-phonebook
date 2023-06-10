import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchContacts from './SearchContacts/SearchContacts';

const DATA_STATE = {
  localKey: 'contacts',
  contacts: [],
  filter: '',
};

export default class App extends PureComponent {
  state = {
    ...DATA_STATE,
  };

  componentDidMount() {
    const dataStorage = localStorage.getItem([this.state.localKey]);
    //
    const parsedDataStorage = JSON.parse(dataStorage);
    if (parsedDataStorage && parsedDataStorage.length > 0) {
      this.setState({ [this.state.localKey]: [...parsedDataStorage] });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem(
        [this.state.localKey],
        JSON.stringify(this.state.contacts)
      );
    }
  }
  // ********************************************

  receiveFormData = data => {
    const { contacts } = this.state;

    if (
      contacts.find(
        contact => contact.name === data.name && contact.number === data.number
      )
    ) {
      alert(`${data.name} is already in contacts.`);
      return;
    }
    this.setState({ contacts: [...contacts, data] });
  };
  //******************************************** */
  filterInputData = debounce(data => {
    this.setState({ filter: data.toLowerCase() });
  }, 400);

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    const filteredContactArr = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter);
    });
    return filteredContactArr; // повертає новий масив
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    return (
      <div className="container">
        <h2>Phone Book</h2>
        <ContactForm onSubmit={this.receiveFormData} />
        {this.state.contacts.length !== 0 && (
          <>
            <SearchContacts onChange={this.filterInputData} />
            <ContactList
              contacts={this.filteredContacts()}
              onDelete={this.deleteContact}
            />
          </>
        )}
      </div>
    );
  }
}

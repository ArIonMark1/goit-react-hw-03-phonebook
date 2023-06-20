import React, { PureComponent } from 'react';
import debounce from 'lodash.debounce';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import SearchContacts from './SearchContacts/SearchContacts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      // додаткова перевірка, як що користувач видалив записи лишається пустий масив але [] === true !!
      this.setState({ [this.state.localKey]: [...parsedDataStorage] });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts.length !== prevState.contacts.length) {
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
      return toast.error(`${data.name} is already in contacts.`);
    }
    this.setState({ contacts: [...contacts, data] });
    toast.success(`${data.name} added in contacts.`);
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
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
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

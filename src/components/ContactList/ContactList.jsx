import React from 'react';
import PropTypes from 'prop-types';
import './ContactList.scss';

const ContactList = ({ contacts, onDelete }) => {
  return (
    <div>
      <div className="contactsContainer">
        <h2>Contacts</h2>
        <ul className="contactsList">
          {contacts &&
            contacts.map(contact => (
              <li key={contact.id}>
                Name:
                <span className="content"> {contact.name}</span>
                Phone:
                <span className="content"> {contact.number}</span>
                <button
                  className="conformButton"
                  type="button"
                  onClick={() => onDelete(contact.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelete: PropTypes.func,
};

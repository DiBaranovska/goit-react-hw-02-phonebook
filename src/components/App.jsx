import React from 'react';
import Form from './form/form';
import Filter from './filter/filter';
import Contacts from './contacts/contacts';
import { nanoid } from 'nanoid';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  formSubmit = data => {
    const normalizedName = data.name.toLowerCase();
    const contactID = nanoid();
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      alert(`${data.name} is already in contacts`);
    } else {
      this.setState(state => ({
        contacts: [
          ...state.contacts,
          { id: contactID, name: data.name, number: data.number },
        ],
      }));
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <div
        style={{
          marginLeft: '20px',
          alignItems: 'center',
        }}
      >
        <h1>Phonebook</h1>
        <Form onSubmit={this.formSubmit} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts
          contacts={this.getVisibleContacts()}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;

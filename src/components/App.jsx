import { Component } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';
import Message from './Message';
import { nanoid } from 'nanoid';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      { id: 'id-5', name: 'Will Smith', number: '127-19-32' },
      { id: 'id-6', name: 'Koza Dereza', number: '345-76-16' },
    ],
    filter: '',
  };

  contactId = () => nanoid();

  handleSubmitFormData = data => {
    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === data.name.toLowerCase()
      )
    ) {
      alert(`${data.name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          {
            id: this.contactId(),
            name: data.name,
            number: data.number,
          },
        ],
      };
    });
  };

  inputFilterContact = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  getFilteredContact = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
      contact.name.toLowerCase().trim().includes(normalizedFilter)
    );
  };

  handleDeleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;
    const fiteredContacts = this.getFilteredContact();

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmitFormData} />
        <h2>Contacts</h2>
        <Filter filter={filter} onInputEntry={this.inputFilterContact} />
        {fiteredContacts < 1 ? (
          <Message text={'The contact was not found ;(((('} />
        ) : (
          <ContactList
            contacts={fiteredContacts}
            onDeleteContact={this.handleDeleteContact}
          />
        )}
      </div>
    );
  }
}

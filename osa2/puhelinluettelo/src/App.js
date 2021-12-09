import React, { useState, useEffect } from "react";
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import luetteloService from './services/luettelo'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    luetteloService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const filtered = persons.filter(person =>
      person.name.toLowerCase() === newName.toLowerCase())
    if (filtered.length > 0) {
      if (newNumber === filtered[0].number) {
        return (
          window.alert(`${newName} is already added to phonebook`)
        )
      }

      if (window.confirm(`${newName} is already added to phonebook, 
        replace the old number with a new one?`)) {
        
        const p = filtered[0]
        const changedPerson = { ...p, number: newNumber }
        return(
        luetteloService
          .update(p.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== p.id
              ? person : returnedPerson))
            setNotificationMessage(`Changed ${returnedPerson.name}'s number`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(`Information of ${p.name} has already been removed from server`)
            setTimeout(()=> {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== p.id))
          })
        )
      }

    }
    const personObject = {
      name: newName,
      number: newNumber
    }
    luetteloService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotificationMessage(`Added ${returnedPerson.name}`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })


  }
  const handleTypingName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleTypingNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleTypingFilter = (event) => {
    setNewSearch(event.target.value)
    if (newSearch.length > 0) {
      setShowAll(false)
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`delete ${person.name}?`)) {
      luetteloService
        .removePerson(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          setNotificationMessage(`Deleted ${person.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
    }
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person =>
      person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage}/>
      <Filter value={newSearch} onChange={handleTypingFilter} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber}
        onChange1={handleTypingName} onChange2={handleTypingNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletingFunction={removePerson} />
    </div>
  )
}

export default App;
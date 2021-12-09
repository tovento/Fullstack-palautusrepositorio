import React from 'react'

const Persons = (props) => {
    const {persons, deletingFunction} = props
    return (
        <div>
            {persons.map(person =>
                <p key={person.name}>{person.name} {person.number}
                <button onClick={()=>deletingFunction(person)} >delete</button>
                </p>)
            }
        </div>)
}



export default Persons
import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input value={props.nameValue} onChange={props.onChange1} />
            </div>
            <div>
                number: <input value={props.numberValue} onChange={props.onChange2} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
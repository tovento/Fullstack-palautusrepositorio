import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} kurssi={part.name} tehtavat={part.exercises} />
            )}
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                {props.kurssi} {props.tehtavat}
            </p>
        </div>
    )
}

const Total = ({ parts }) => {
    return (
        <div>
            <p>
                <strong>total of {parts.reduce((sum, part) => {
                    return sum + part.exercises
                }, 0)} exercises</strong>
            </p>
        </div>
    )
}
export default Course
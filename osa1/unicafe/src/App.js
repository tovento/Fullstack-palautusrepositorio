import React, { useState } from 'react'


function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGoodClick = () => setGood(good + 1)
  const addNeutralClick = () => setNeutral(neutral + 1)
  const addBadClick = () => setBad(bad + 1)


  return (
    <div>
      <Heading text="give feedback" />
      <Button handleClick={addGoodClick} text="good" />
      <Button handleClick={addNeutralClick} text="neutral" />
      <Button handleClick={addBadClick} text="bad" />
      <Heading text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const Heading = (props) => (
  <h1>{props.text}</h1>
)

const Statistics = (props) => {
  const all = props.good + props.bad + props.neutral
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <StatisticLine text="good" value={props.good} />
          </tr>
          <tr>
            <StatisticLine text="neutral" value={props.neutral} />
          </tr>
          <tr>
            <StatisticLine text="bad" value={props.bad} />
          </tr>
          <tr>
            <StatisticLine text="all" value={all} />
          </tr>
          <tr>
            <StatisticLine text="average" value={(props.good - props.bad) / all} />
          </tr>
          <tr>
            <StatisticLine text="positive" value={props.good / all * 100} text2="%" />
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <>
      <td>{props.text}</td>
      <td>{props.value} {props.text2}</td>
    </>
  )
}

export default App;
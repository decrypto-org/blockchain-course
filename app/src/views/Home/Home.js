import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Home extends Component {
  render () {
    return (
      <section id='start-screen' className='start-screen'>
        <div className='start-screen-wrapper'>
          <h1>Blockchain<br />Course</h1>

          <p className='enter-game'>Press <Link to='/assignment'>ENTER</Link> to start game</p>

          <table className='scoreboard'>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1st</td>
                <td>laxmana</td>
                <td class='score'>1 697 384</td>
              </tr>
              <tr>
                <td>2nd</td>
                <td>dionyziz</td>
                <td class='score'>572 007</td>
              </tr>
              <tr>
                <td>3rd</td>
                <td>sol3gga</td>
                <td class='score'>571 332</td>
              </tr>
              <tr>
                <td>4th</td>
                <td>jim</td>
                <td class='score'>569 700</td>
              </tr>
              <tr>
                <td>5th</td>
                <td>katerina</td>
                <td class='score'>273 260</td>
              </tr>
              <tr>
                <td>6th</td>
                <td>orestis</td>
                <td class='score'>199 787</td>
              </tr>
              <tr>
                <td>7th</td>
                <td>orfeas</td>
                <td class='score'>73 710</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    )
  }
}

export default Home

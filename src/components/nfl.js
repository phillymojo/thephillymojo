import React from "react"
import { connect } from "react-redux"

class NFL extends React.Component {

  renderSchedule(games, isLoading) {
    if(isLoading) {
      return <div>Loading...</div>
    }
    // if(Object.keys(schedule).length === 0 && schedule.constructor === Object) return [];
    let tables = [];

    const games_by_week = {};

      games.forEach((game) => {
        const week = game.week;
        if (!games_by_week[`week_${week}`]) games_by_week[`week_${week}`] = [];
        games_by_week[`week_${week}`].push(game);
      });

    for (let i = 1; i <= 17; i++) {
      let table =[];
      const week = games_by_week[`week_${i}`];

      week.map((game) => {
        table.push(
          <tr key={`week${i}_${game.awayTeam.Name}at${game.homeTeam.Name}`}>
            <td>{i}</td>
            <td>{game.awayTeam.Name}</td>
            <td>{game.homeTeam.Name}</td>
            <td>{game.time}</td>
            <td>{game.date}</td>
          </tr>
        )
      });
      tables.push(
        <table key={`table${i}`}>
          <thead>
          <tr>
            <th>Week</th>
            <th>Away</th>
            <th>Home</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {table}
          </tbody>
        </table>
        )
    }

    return tables
  }

  render() {
    const schedule = this.props.schedule;
    const isLoading = this.props.isLoading;
    return (
      <div>
        NFL Data
        {
          this.renderSchedule(schedule, isLoading)          
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    schedule: state.nflschedule,
    isLoading: state.isLoading
  }
}

export const NFLConnected = connect(
  mapStateToProps
)(NFL)
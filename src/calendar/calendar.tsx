// tslint:disable:no-console
// tslint:disable:jsx-no-lambda
// tslint:disable:object-literal-sort-keys

import * as moment from "moment";
import * as React from "react";
import './calendar.css'


class Calendar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const now = moment();
        this.state = { 
            day: now.date(),
            month: now.month() + 1,
            monthStart: now.startOf('month'),
            monthEnd: now.endOf('month'),
            selectedDate: null,
            today: now, 
            year: now.year(),
        };

        this.onDateSelect = this.onDateSelect.bind(this);
    }
    

    public createDays = () => {
        const monthStart = moment(this.state.today).startOf("month");
        const startDate = monthStart.startOf("week");
        const monthEnd = moment(this.state.today).endOf("month");
        const endDate = monthEnd.endOf("week");

        const dateFormat = "D";
        const canvas = [];
        let day = startDate;
        let formattedDate = "";
        let cells = [];
        while (moment(day).isSameOrAfter(startDate) && moment(day).isSameOrBefore(endDate)) {
            for (let i = 0; i < 7; i++) {
                formattedDate = moment(day).format(dateFormat);
                const cloneDay = moment(day);
                
                if ((cloneDay.isSameOrAfter(startDate) && cloneDay.isBefore(moment(this.state.today).startOf("month"))) || (cloneDay.isSameOrBefore(endDate) && cloneDay.isAfter(moment(this.state.today).endOf("month")))) {
                  cells.push(<td className="canvas-cell" key={day.toString()} onClick={() => this.onDateSelect(cloneDay)}>
                      <span className="number grey">
                        {formattedDate}
                      </span>
                    </td>);
                } else {
                  cells.push(<td className="canvas-cell" key={day.toString()} onClick={() => this.onDateSelect(cloneDay)}>
                      <span className="number">
                        {formattedDate}
                      </span>
                    </td>);
                }
                day = day.add(1, "day");

            }
            canvas.push(<tr className="canvas-row" key={day.toString()}>{cells}</tr>);
            cells = [];
        }
        return canvas;
    }


   public onDateSelect = (date:moment.Moment) => {
       this.setState({
           selectedDate: date
       })
    }

    public selectPreviousMonth = () => { 
        const now = moment(this.state.today);
        const prevMonth = now.subtract(1, "months");

        if(prevMonth.month() + 1  === 0) {
            prevMonth.subtract(1, 'years')
        }

        this.setState({ 
            month: prevMonth.month() +1,
            monthEnd: prevMonth.endOf('month'),
            monthStart: prevMonth.startOf('month'),
            today: prevMonth,
            year: prevMonth.year(),
        })

    }

   public  selectNextMonth = () => { 
       const now = moment(this.state.today);
       const nextMonth = now.add(1, 'months')

       if ((nextMonth.month() + 1)> 12) {
           nextMonth.add(1, 'years')
       }

       this.setState({
           month: nextMonth.month() + 1,
           monthEnd: nextMonth.endOf('month'),
           monthStart: nextMonth.startOf('month'),
           today: nextMonth,
           year: nextMonth.year(),
       })

    }


  public render() {
      return <div className="calendar">
          <div className="App-header">Streaming Soon</div>
          <div className="calendar-heading">
            <i onClick={this.selectPreviousMonth} className="material-icons md-48 left">chevron_left</i>
              <span>{moment(this.state.month, 'MM').format('MMMM')}</span>
              <span>{this.state.year}</span>
              <i onClick={this.selectNextMonth}className="material-icons md-48 right">chevron_right</i>
          </div>
          <table>
            <tbody>
              <tr className="canvas-row">
                <td className="day-heading">Sunday</td>
                <td className="day-heading">Monday</td>
                <td className="day-heading">Tuesday</td>
                <td className="day-heading">Wednesday</td>
                <td className="day-heading">Thursday</td>
                <td className="day-heading">Friday</td>
                <td className="day-heading">Saturday</td>
              </tr>
                {this.createDays()}
            </tbody>
          </table>
        </div>;
  }
}

export default Calendar;
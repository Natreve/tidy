/**
 * Calendar code based on the following
 * https://codepen.io/nickjvm/pen/bERraX?editors=0011
 * https://codepen.io/KennySing/pen/poVGwj
 * **/
import * as React from "react";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import "./style.scss";
type status = "claimed" | "unclaimed" | "completed";
export type CalendarEvent = {
  id: string;
  name: string;
  date: DateTime;
  status?: status;
  assigned?: string;
  options?: { [key: string]: any };
};
type DayType = {
  selected?: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  number: number;
  date: DateTime;
  events?: CalendarEvent[];
};
type WeekType = {
  date: DateTime;
  events?: CalendarEvent[];
};
interface CalendarState {
  month: any;
  selected: any;
}

export type CalendarProps = {
  events?: CalendarEvent[];
};

export class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      month: DateTime.now(),
      selected: DateTime.now().day,
    };
  }

  prev = () => {
    const { month } = this.state;
    const now = DateTime.now();
    // can't go back in time
    if (month.minus({ month: 1 }).month < now.month) return;

    this.setState({ month: month.minus({ month: 1 }) });
    return this;
  };
  next = () => {
    const { month } = this.state;
    this.setState({ month: month.plus({ month: 1 }) });
    return this;
  };
  select(day: number) {
    // this.setState({
    //   selected: day.date,
    //   month: day.date.clone(),
    // });
  }

  renderWeeks = (month: DateTime) => {
    const weeks = [];

    let date = month
      .startOf("month")
      .minus({ week: 1 })
      .startOf("week")
      .minus({ day: 1 }); //last week of last month

    let done = false;
    let count = 0;
    let monthNumber = month.month;

    while (!done) {
      weeks.push(<Week key={v4()} date={date} events={this.props.events} />);
      date = date.plus({ week: 1 }); //next week of month
      done = count++ > 2 && monthNumber !== date.month;
      monthNumber = date.month;
    }
    //for some reason a addtional week is added so remove it
    weeks.shift();
    return weeks;
  };

  render() {
    return (
      <div className="calendar">
        <div className="header">
          <svg
            width="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.prev}
          >
            <path
              d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
              stroke="#FFFF"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h3>{this.state.month.toFormat("LLLL yyyy")}</h3>
          <svg
            width="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={this.next}
          >
            <path
              d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
              stroke="#FFFF"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <table className="month">
          <thead>
            <tr>
              <th className="day-name">Sun</th>
              <th className="day-name">Mon</th>
              <th className="day-name">Tue</th>
              <th className="day-name">Wed</th>
              <th className="day-name">Thu</th>
              <th className="day-name">Fri</th>
              <th className="day-name">Sat</th>
            </tr>
          </thead>
          <tbody>{this.renderWeeks(this.state.month)}</tbody>
        </table>
        {/* <div className="v-info">
          <section id="1" className="v-section">
            <p className="v-section_item">
              <span className="v-section_line"></span>
              <span className="v-section_time">9:00 pm </span>
              Complete birthday party preparations: buy baloons and chocolate.
            </p>
            <p className="v-section_item">
              <span className="v-section_line"></span>
              <span className="v-section_time">12:45 pm</span>
              Watch series.
            </p>
            <p className="v-section_item">
              <span className="v-section_line"></span>
              <span className="v-section_time">15:00 pm</span>
              Video calling with Tom.
            </p>
            <p className="v-section_item">
              <span className="v-section_line"></span>
              <span className="v-section_time">19:00 pm</span>
              Buy theater tickets
            </p>
          </section>
        </div> */}
      </div>
    );
  }
}

class Week extends React.Component<WeekType> {
  render() {
    const days: React.ReactElement<Day>[] = [];

    let { date, events } = this.props;

    for (var i = 0; i < 7; i++) {
      const isToday = date.hasSame(DateTime.now(), "day");
      const day = {
        number: date.day,
        isToday,
        date,
        isCurrentMonth: date.hasSame(DateTime.now(), "month"),
        events,
      };

      days.push(<Day key={v4()} {...day} />);
      date = date.plus({ day: 1 });
    }

    return <tr className="week">{days}</tr>;
  }
}
class Day extends React.Component<DayType> {
  render() {
    const { isToday, number, events, isCurrentMonth, date } = this.props;

    return (
      <td
        className={`day ${isToday ? "today" : ""} ${
          !isCurrentMonth ? "inactive" : ""
        }`}
      >
        <span className="number">{number}</span>
        {events?.map((event) => {
          if (!date.hasSame(event.date, "day")) return null;
          return (
            <span
              key={event.id}
              className="event"
              style={{
                background: event.options?.background || "rgba(0, 0, 0, 0.3)",
              }}
            >
              <p>Cleaning</p>
            </span>
          );
        })}
      </td>
    );
  }
}

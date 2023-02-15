/**
 * Calendar code based on the following
 * https://codepen.io/nickjvm/pen/bERraX?editors=0011
 * https://codepen.io/KennySing/pen/poVGwj
 * **/
import * as React from "react";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import Icon from "../icons";
import "./style.scss";
type status = "claimed" | "unclaimed" | "completed";
type WeekType = {
  date: DateTime;
  events?: CalendarEvent[];
  onDayClick?: (date: DateTime) => void;
  onEventClick?: (event: CalendarEvent) => void;
};
type DayType = {
  selected?: boolean;
  isToday: boolean;
  isCurrentMonth: boolean;
  number: number;
  date: DateTime;
  events?: CalendarEvent[];
  onDayClick?: (date: DateTime) => void;
  onEventClick?: (event: CalendarEvent) => void;
};
interface CalendarState {
  month: any;
  selected: any;
}

export type CalendarProps = {
  events?: CalendarEvent[];
  onDayClick?: (date: DateTime) => void;
  onEventClick?: (event: CalendarEvent) => void;
};
export type CalendarEvent = {
  id: string;
  name: string;
  date: DateTime;
  status?: status;
  assigned?: string;
  options?: { [key: string]: any };
  onDayClick?: (date: DateTime) => void;
  onEventClick?: (event: CalendarEvent) => void;
};

export class Calendar extends React.Component<CalendarProps, CalendarState> {
  constructor(props: CalendarProps) {
    super(props);
    this.state = {
      month: DateTime.now(),
      selected: DateTime.now().day,
    };
  }
  _onDayClick = () => {};
  onDayClick = (onDayClick: () => void) => (this._onDayClick = onDayClick);

  _onEventClick = (event: CalendarEvent) => {};
  onEventClick = (onEventClick: () => void) =>
    (this._onEventClick = onEventClick);
  prev = () => {
    const { month } = this.state;
    // const now = DateTime.now();
    // can't go back in time or can you
    // if (month.minus({ month: 1 }).month < now.month) return;

    this.setState({ month: month.minus({ month: 1 }) });
    return this;
  };
  next = () => {
    const { month } = this.state;
    this.setState({ month: month.plus({ month: 1 }) });
    return this;
  };

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
      weeks.push(
        <Week
          key={v4()}
          date={date}
          events={this.props.events}
          onEventClick={(event) => {
            this._onEventClick(event);
            if (this.props.onEventClick) this.props.onEventClick(event);
          }}
        />
      );
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
          <h3>{this.state.month.toFormat("LLLL yyyy")}</h3>
          <div className="navigation">
            <Icon name="arrow-left" click={() => this.prev()} />
            <Icon name="arrow-right" click={() => this.next()} />
          </div>
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

      days.push(
        <Day key={v4()} {...day} onEventClick={this.props.onEventClick} />
      );
      date = date.plus({ day: 1 });
    }

    return <tr className="week">{days}</tr>;
  }
}

class Day extends React.Component<DayType> {
  onDayClick = (e: React.MouseEvent, date: DateTime) => {
    if (DateTime.now() > date) return; //can't set events in the past or present only in the future

    if (!this.props.onDayClick) return;

    this.props.onDayClick(date);
  };
  onEventClick = (e: React.MouseEvent, event: CalendarEvent) => {
    if (!this.props.onEventClick) return;
    this.props.onEventClick(event);
  };
  render() {
    const { isToday, number, events, date } = this.props;

    return (
      <td
        className={`day${isToday ? " today" : ""}`}
        // className={`day${isToday ? " today" : ""}${
        //   DateTime.now().minus({ day: 1 }) > date ? " inactive" : ""
        // }`}
        onClick={(e) => this.onDayClick(e, date)}
      >
        <span className="number">{number}</span>
        {events?.map((event) => {
          if (!date.hasSame(event.date, "day")) return null;
          return (
            <span
              key={event.id}
              className="event"
              onClick={(e) => {
                // if (DateTime.now() > date) return; // can't on the same day
                this.onEventClick(e, event);
              }}
              style={{
                background: event.options?.background || "rgba(0, 0, 0, 0.3)",
              }}
            >
              {event.name}
            </span>
          );
        })}
      </td>
    );
  }
}

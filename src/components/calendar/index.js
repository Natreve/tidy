/**
 * Calendar code based on the following
 * https://codepen.io/nickjvm/pen/bERraX?editors=0011
 * https://codepen.io/KennySing/pen/poVGwj
 * **/
import * as React from "react";
import { DateTime } from "luxon";
import { v4 } from "uuid";
import "./style.scss";
export class Calendar extends React.Component {
    constructor(props) {
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
        if (month.minus({ month: 1 }).month < now.month)
            return;
        this.setState({ month: month.minus({ month: 1 }) });
        return this;
    };
    next = () => {
        const { month } = this.state;
        this.setState({ month: month.plus({ month: 1 }) });
        return this;
    };
    select(day) {
        // this.setState({
        //   selected: day.date,
        //   month: day.date.clone(),
        // });
    }
    renderWeeks = (month) => {
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
            weeks.push(React.createElement(Week, { key: v4(), date: date, events: this.props.events }));
            date = date.plus({ week: 1 }); //next week of month
            done = count++ > 2 && monthNumber !== date.month;
            monthNumber = date.month;
        }
        //for some reason a addtional week is added so remove it
        weeks.shift();
        return weeks;
    };
    render() {
        return (React.createElement("div", { className: "calendar" },
            React.createElement("div", { className: "header" },
                React.createElement("svg", { width: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", onClick: this.prev },
                    React.createElement("path", { d: "M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008", stroke: "#FFFF", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" })),
                React.createElement("h3", null, this.state.month.toFormat("LLLL yyyy")),
                React.createElement("svg", { width: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", onClick: this.next },
                    React.createElement("path", { d: "M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008", stroke: "#FFFF", strokeWidth: "1.5", strokeMiterlimit: "10", strokeLinecap: "round", strokeLinejoin: "round" }))),
            React.createElement("table", { className: "month" },
                React.createElement("thead", null,
                    React.createElement("tr", null,
                        React.createElement("th", { className: "day-name" }, "Sun"),
                        React.createElement("th", { className: "day-name" }, "Mon"),
                        React.createElement("th", { className: "day-name" }, "Tue"),
                        React.createElement("th", { className: "day-name" }, "Wed"),
                        React.createElement("th", { className: "day-name" }, "Thu"),
                        React.createElement("th", { className: "day-name" }, "Fri"),
                        React.createElement("th", { className: "day-name" }, "Sat"))),
                React.createElement("tbody", null, this.renderWeeks(this.state.month)))));
    }
}
class Week extends React.Component {
    render() {
        const days = [];
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
            days.push(React.createElement(Day, { key: v4(), ...day }));
            date = date.plus({ day: 1 });
        }
        return React.createElement("tr", { className: "week" }, days);
    }
}
class Day extends React.Component {
    render() {
        const { isToday, number, events, isCurrentMonth, date } = this.props;
        return (React.createElement("td", { className: `day ${isToday ? "today" : ""} ${!isCurrentMonth ? "inactive" : ""}` },
            React.createElement("span", { className: "number" }, number),
            events?.map((event) => {
                if (!date.hasSame(event.date, "day"))
                    return null;
                return (React.createElement("span", { key: event.id, className: "event", style: {
                        background: event.options?.background || "rgba(0, 0, 0, 0.3)",
                    } },
                    React.createElement("p", null, event.name)));
            })));
    }
}

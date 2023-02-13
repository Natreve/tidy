import * as React from "react";
import { CalendarEvent } from "../calendar";
import Button from "../button";
import "./style.scss";
import Icon from "../icons";
type PopupProps = {
  active?: boolean;
};
interface PopupState {
  event: CalendarEvent | null;
}

export class Popup extends React.Component<PopupProps, PopupState> {
  constructor(props: PopupProps) {
    super(props);
    this.state = {
      event: null,
    };
  }
  show(event: CalendarEvent) {
    this.setState({ event });
  }
  hide() {
    this.setState({ event: null });
  }

  render() {
    const { event } = this.state;
    console.log(event?.date.toJSDate());

    return (
      <div
        role="dialog"
        className={`${this.state.event ? "active " : ""}popup`}
      >
        <div className="container">
          <h1>
            {event?.name} <Icon name="close" click={() => this.hide()} />
          </h1>
          <span>{event?.date.plus({ hour: 5 }).toFormat("DDDD t")}</span>
          <Button className="claim">Claim Job</Button>
        </div>
      </div>
    );
  }
}

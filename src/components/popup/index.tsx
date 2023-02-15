import * as React from "react";
import { CalendarEvent } from "../calendar";
import Button from "../button";
import "./style.scss";
import Icon from "../icons";
type PopupProps = {
  active?: boolean;
  onAction?: (x: string) => void;
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
    return this;
  }
  hide() {
    this.setState({ event: null });
    return this;
  }
  _onAction = (x: string) => {};
  onAction = (onAction: (x: string) => void) => (this._onAction = onAction);

  render() {
    const { event } = this.state;
    const onEventAction = (action: string) => {
      if (this.props.onAction) this.props.onAction(action);
      this._onAction(action);
      this.hide();
    };
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
          {event?.assigned ? (
            <Button className="claim" onClick={() => onEventAction("unclaim")}>Unclaim</Button>
          ) : (
            <Button className="claim" onClick={() => onEventAction("claim")}>Claim</Button>
          )}
        </div>
      </div>
    );
  }
}

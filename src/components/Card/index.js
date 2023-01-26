import React, { useState } from "react";
import * as css from "./css.module.scss";
import { DateTime } from "luxon";
const Card = (props) => {
  return (
    <div className={css.card}>
      <div className={css.content}>
        <div className={css.header}>
          <h1>{props.header}</h1>
          <div className={css.meta}>{props.meta}</div>
        </div>
      </div>
      <div className={css.attached}>
        <span>{props.attached}</span>
      </div>
    </div>
  );
};
const BookingCard = (props) => {
  const { data: booking } = props;
  const [claimed, setClaimed] = useState(props.claimed);
  const date = DateTime.fromJSDate(new Date(booking.date)).toFormat(
    "LLL dd, yyyy"
  );
  const onBooking = () => {
    props.onBooking({ ...booking, date: booking.date, claimed });
  };
  const onClaim = (e) => {
    e.stopPropagation();
    setClaimed(!claimed);
    props.onClaim({ ...booking, date: booking.date, claimed: !claimed });
  };

  return (
    <div className={css.card} onClick={onBooking}>
      <div className={css.content}>
        <div className={css.header}>
          <h1>{booking.name}</h1>
          <div className={css.meta}>{date}</div>
        </div>
      </div>
      <div className={css.attached} onClick={onClaim}>
        <span className={claimed ? css.claimed : ""}>
          {claimed ? "Claimed" : "Unclaimed"}
        </span>
      </div>
    </div>
  );
};
export { Card, BookingCard };

import React, { useState } from "react";
import * as css from "./css.module.scss";
import { DateTime } from "luxon";
import telegramParamToJson from "../../utils/telegramParamToJson";
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
  const { data: booking, ctx } = props;
  const [claimed, setClaimed] = useState(props.claimed);
  const date = DateTime.fromJSDate(booking.date.toDate()).toFormat("DDDD");
  const onBooking = () => {
    booking.options.claimed = claimed;
    props.onBooking(booking);
  };
  const onClaim = (e) => {
    e.stopPropagation();
    const initData = telegramParamToJson(ctx.Telegram.WebApp.initData);
  
    if (!booking.options.claimed) {
      setClaimed(!claimed);
      booking.options.claimed = !claimed;
      props.onClaim(booking);
      return;
    }

    if (booking.options.claimed === initData.user.id) {
      setClaimed(!claimed);
      booking.options.claimed = !claimed;
      props.onClaim(booking);
      return;
    }
    return;
  };

  return (
    <div className={css.card} onClick={onBooking}>
      <div className={css.content}>
        <div className={css.header}>
          <h1>{booking.options.name}</h1>
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

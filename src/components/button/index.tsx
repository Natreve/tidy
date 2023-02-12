import * as React from "react";
import "./style.scss";
type AnchorProps = React.AnchorHTMLAttributes<HTMLElement>;
type ButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type MyButtonProps = AnchorProps | ButtonProps;

function isAnchor(props: MyButtonProps): props is AnchorProps {
  return (props as AnchorProps).href !== undefined;
}

export default function Button(props: ButtonProps) {
  if (isAnchor(props)) {
    return <a className="button" {...props}></a>;
  }

  return (
    <button className={props.className} type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

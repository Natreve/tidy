import React from "react";
import Icons from "./icons.svg";
import PropTypes from "prop-types";
import "./style.scss";

export type IconProps = {
  click: (icon: Icon, e: React.MouseEvent) => void;
  size: string | number;
  name: string;
  selected: boolean;
  color?: string;
};
interface IconState {
  selected: boolean;
}
class Icon extends React.Component<IconProps, IconState> {
  static defaultProps: {
    name: string;
    color?: string;
    size: number;
    click: () => void;
    selected: boolean;
  };
  static propTypes: {
    name: PropTypes.Requireable<string>;
    color?: PropTypes.Requireable<string>;
    size: PropTypes.Requireable<number>;
    click: PropTypes.Requireable<(...args: any[]) => any>;
    selected: PropTypes.Requireable<boolean>;
  };
  constructor(props: IconProps) {
    super(props);
    this.state = { selected: props.selected };
  }
  onclick = (e: React.MouseEvent) => {
    this.props.click(this, e);
  };
  toggleSelected = () => {
    this.setState({ selected: !this.state.selected });
    return !this.state.selected;
  };
  render() {
    const { props, state } = this;

    return (
      <svg
        className={`${state.selected ? "selected " : ""}icon`}
        width={props.size}
        height={props.size}
        onClick={this.onclick}
      >
        <use href={`${Icons}#icon-${props.name}`} stroke={props.color} />
      </svg>
    );
  }
}
Icon.propTypes = {
  name: PropTypes.string,
  // color: PropTypes.string,
  size: PropTypes.number,
  click: PropTypes.func,
  selected: PropTypes.bool,
};
Icon.defaultProps = {
  name: "",
  color: "#A2A2A2",
  size: 24,
  click: () => {},
  selected: false,
};
export default Icon;

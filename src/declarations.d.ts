declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
declare interface Telegram {
  WebApp: { ready: function };
}

declare interface Window {
  Telegram: Telegram;
}

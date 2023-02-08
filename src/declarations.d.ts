declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare interface Telegram {
  WebApp: { ready: function };
}

declare interface Window {
  Telegram: Telegram;
}

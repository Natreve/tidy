const telegramParamToJson = (queryString: string) => {
  const params = new URLSearchParams(queryString);

  const json: { [key: string]: any } = {};
  for (const [key, value] of params) {
    if (key === "user") {
      json[key] = JSON.parse(decodeURIComponent(value));
    } else {
      json[key] = value;
    }
  }
  return json;
};
export default telegramParamToJson;

const  telegramParamToJson = (queryString) => {
  const params = new URLSearchParams(queryString);

  const json = {};
  for (const [key, value] of params) {
    if (key === "user") {
      json[key] = JSON.parse(decodeURIComponent(value));
    } else {
      json[key] = value;
    }
  }
  return json;
};
export default telegramParamToJson
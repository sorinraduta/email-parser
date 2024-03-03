export const parseEmailHtml = (html: string) => {
  // Pickup and delivery time
  let dateTimeRegexPattern =
    /<strong>(\d{4}-\d{2}-\d{2} \[\d{2}:\d{2}\])<\/strong>/g;
  let dateTimeMatch = html.match(dateTimeRegexPattern);

  const pickupTime = dateTimeMatch?.[0]
    .replace(/<strong>/g, "")
    .replace(/<\/strong>/g, "");
  const deliveryTime = dateTimeMatch?.[1]
    .replace(/<strong>/g, "")
    .replace(/<\/strong>/g, "");

  // Pickup and delivery postal codes
  const postalCodeRegexPattern = /[A-Z]{2}-[0-9]{5} [A-Za-z]+/g;
  const postalCodeMatches = html.match(postalCodeRegexPattern);
  const pickup = postalCodeMatches?.[0];
  const delivery = postalCodeMatches?.[1];

  // Weight
  let weightRegexPattern = /\d+(?:\.\d+)?\s?kg<\/td>/g;
  const weightMatches = html.match(weightRegexPattern);
  const weight = weightMatches?.[0].replace("</td>", "");

  // Goods
  let goodsRegexPattern = />Load:<\/td>([\r\n]|\s)+<td>.*<\/td>/;
  const goodsMatches = html.match(goodsRegexPattern);
  const goods = goodsMatches?.[0]
    .replace(/>Load:<\/td>([\r\n]|\s)+<td>/, "")
    .replace(/ \|.{1,8}<\/td>/, "")
    .replace(/<sup>|<\/sup>/g, "");

  return {
    pickup,
    delivery,
    goods,
    weight,
    pickupTime,
    deliveryTime,
  };
};

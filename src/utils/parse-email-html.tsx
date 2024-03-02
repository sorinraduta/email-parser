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
  let goodsRegexPattern =
    /border-bottom-color: currentcolor;">.{1,30}<span class="Apple-converted-space">/;
  const goodsMatches = html.match(goodsRegexPattern);
  console.log("acaca: ", goodsMatches);
  const goods = goodsMatches?.[0]
    .replace('border-bottom-color: currentcolor;">', "")
    .replace('<span class="Apple-converted-space">', "");

  return {
    pickup,
    delivery,
    goods,
    weight,
    pickupTime,
    deliveryTime,
  };
};

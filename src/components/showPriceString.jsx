export default function showPriceString(number) {
  let numberString = number.toString();
  const regex = /\.\d{2}/;
  if (!regex.test(numberString)) {
    if (!numberString.split("").includes(".")) {
      numberString = numberString + ".00";
    } else numberString = numberString + "0";
  }
  return "$" + numberString;
}

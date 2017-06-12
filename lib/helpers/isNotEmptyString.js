export default function isNotEmptyString(str) {
  return typeof str === 'string' && str.length > 0
}

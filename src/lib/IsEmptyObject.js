import { isNull, isUndefined } from "util";

export default function isEmptyObject(obj) {
  if (isNull(obj) || isUndefined(obj)) {
    return true;
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

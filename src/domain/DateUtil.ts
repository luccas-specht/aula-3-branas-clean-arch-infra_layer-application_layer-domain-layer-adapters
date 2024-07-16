export default class DateUtils {
  static calculateDiffInMili(start: Date, end: Date) {
    return end.getTime() - start.getTime();
  }
}

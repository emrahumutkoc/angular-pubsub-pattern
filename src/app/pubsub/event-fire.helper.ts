const win =
  typeof window === 'undefined'
    ? { fireAngularEvent: (...args: any) => {} }
    : window;

export class EventFireHelper {
  public static fire(eventName: string, data: any) {
    win['fireAngularEvent'](eventName, data);
  }
}

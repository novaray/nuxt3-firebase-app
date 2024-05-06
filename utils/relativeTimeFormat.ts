export class RelativeTimeFormat {
  static formatRelativeTime(targetTime: Date = new Date('2024-05-06')) {
    const rtf = new Intl.RelativeTimeFormat('ko', {
      numeric: 'auto'
    });

    const currentTime = new Date();
    const timeDiff = Math.abs(targetTime.valueOf() - currentTime.valueOf());

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(hours / 365);
    console.log(seconds, minutes, hours, days, years);
    if (years > 0) {
      return rtf.format(-years, 'year');
    } else if (days > 0) {
      return rtf.format(-days, 'day');
    } else if (hours > 0) {
      return rtf.format(-hours, 'hour');
    } else if (minutes > 0) {
      return rtf.format(-minutes, 'minute');
    } else {
      // seconds
      return rtf.format(-seconds, 'second');
    }
  }
}

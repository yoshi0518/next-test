import dayjs from 'dayjs';

import 'dayjs/locale/ja';

import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

// utcプラグインを追加
dayjs.extend(utc);

// timezoneプラグインを追加
dayjs.extend(timezone);

// 日本時間を設定
dayjs.tz.setDefault('Asia/Tokyo');

// 日本語を設定
dayjs.locale('ja');

/**
 * Day.js Operation Class
 *
 * ex1) get Day.js Class
 *    const dt = new Dayjs();
 *    const dt = new Dayjs('2020-04-01');
 *
 * ex2) Add Year
 *    dt.addYear(1);
 *
 * ex3) Add Month
 *    dt.addMonth(1);
 *
 * ex4) Add Day
 *    dt.addDay(1);
 *
 * ex5) Add Hour
 *    dt.addHour(1);
 *
 * ex6) Add Minute
 *    dt.addMinute(1);
 *
 * ex7) Add Second
 *    dt.addSecond(1);
 *
 * ex8) Get First Day of Month
 *    dt.firstOfTheMonth();
 *
 * ex9) Get Last Day of Month
 *    dt.endOfTheMonth();
 *
 * ex10) Get Format Day
 *    dt.format();
 *    dt.format('YYYY-MM-DD');
 */
export const Dayjs = class {
  #dt;

  constructor(dt: string | null = null) {
    this.#dt = dt === null ? dayjs() : dayjs(dt);
  }

  /**
   * 年を加算
   * @param num 加算する年
   */
  addYear = (num: number) => {
    this.#dt = this.#dt.add(num, 'year');
    return this;
  };

  /**
   * 月を加算
   * @param num 加算する月
   */
  addMonth = (num: number) => {
    this.#dt = this.#dt.add(num, 'month');
    return this;
  };

  /**
   * 日を加算
   * @param num 加算する日
   */
  addDay = (num: number) => {
    this.#dt = this.#dt.add(num, 'day');
    return this;
  };

  /**
   * 時間を加算
   * @param num 加算する時間
   */
  addHour = (num: number) => {
    this.#dt = this.#dt.add(num, 'hour');
    return this;
  };

  /**
   * 分を加算
   * @param num 加算する分
   */
  addMinute = (num: number) => {
    this.#dt = this.#dt.add(num, 'minute');
    return this;
  };

  /**
   * 秒を加算
   * @param num 加算する秒
   */
  addSecond = (num: number) => {
    this.#dt = this.#dt.add(num, 'second');
    return this;
  };

  /**
   * 月初日を取得
   */
  firstOfTheMonth = () => {
    this.#dt = this.#dt.startOf('month');
    return this;
  };

  /**
   * 月末日を取得
   */
  endOfTheMonth = () => {
    this.#dt = this.#dt.endOf('month');
    return this;
  };

  /**
   * 指定書式の日時文字列を取得。デフォルト書式は`YYYY-MM-DD HH:mm:ss`
   * @param format 日時書式
   */
  format = (format = 'YYYY-MM-DD HH:mm:ss') => this.#dt.format(format);
};

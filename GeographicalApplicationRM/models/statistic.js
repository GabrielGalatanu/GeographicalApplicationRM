// eslint-disable-next-line no-unused-vars
import Question from './question';

class Statistic {
  /**
   *
   * @param {string} date
   * @param {string} duration
   * @param {string} type
   * @param {number} correctAnswerCount
   * @param {Question[]} questions
   */

  constructor(date, duration, type, correctAnswerCount, questions) {
    this.date = date;
    this.duration = duration;
    this.type = type;
    this.correctAnswerCount = correctAnswerCount;
    this.questions = questions;
  }
}

export default Statistic;

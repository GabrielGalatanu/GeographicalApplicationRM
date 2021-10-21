class Question {
  /**
   * @typedef variants
   * @property {number} id
   * @property {string} variant
   */

  /**
   * @param {number} questionNumber
   * @param {number} correctAnswerID
   * @param {number|null} selectedAnswerID
   * @param {string} questionString
   * @param {variants[]} variantsArray
   */
  constructor(
    questionNumber,
    correctAnswerID,
    selectedAnswerID,
    questionString,
    variantsArray,
  ) {
    this.questionNumber = questionNumber;
    this.correctAnswerID = correctAnswerID;
    this.selectedAnswerID = selectedAnswerID;
    this.questionString = questionString;
    this.variantsArray = variantsArray;
  }

  shuffle = () => {
    for (let i = this.variantsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this.variantsArray[i];
      this.variantsArray[i] = this.variantsArray[j];
      this.variantsArray[j] = temp;
    }
  };

  /**
   * Set the selected variant.
   *
   * @param {number|null} id
   */

  setSelectedAnswerID = id => {
    this.selectedAnswerID = id;
  };
}

export default Question;

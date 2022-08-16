import dayjs from 'dayjs';

function generateTodayWordIndex(totalWords: number) {
  const fixTimeZone = -3 * 60 * 60 * 1000;
  const timeNow = new Date(Date.now() + fixTimeZone);
  const reference = new Date(0);

  const differenceInTime =
    timeNow.getTime() - fixTimeZone - reference.getTime();
  const differenteInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  const wordIndex = differenteInDays % totalWords;
  return wordIndex;
}

function generateGameData() {
  const totalWords = 5757;
  const startTime = dayjs();
  const endTime = startTime.endOf('day');
  const answer = generateTodayWordIndex(totalWords);
  return {
    startTime,
    endTime,
    answer,
  };
}

export { generateGameData };

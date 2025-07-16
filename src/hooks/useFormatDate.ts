// Кастомный хук для форматирования данных полученных от Api

const useFormatDate = (timeNoFormat: string[], temperatureNoForamt: number[], forecastDays: number) => {
  const result: { time: string[], temperature: number[] } = {
    time: [],
    temperature: [],
  };

  if (forecastDays === 1) {
    const now = new Date();
    const Ago24H = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    timeNoFormat.forEach((time, index) => {
      const date = new Date(time);
      if (date >= Ago24H && date <= now) {
        result.time.push(time.substring(11, 16));
        result.temperature.push(temperatureNoForamt[index]);
      }
    });
  }
  if (forecastDays === 3 || forecastDays === 7) {

    if (forecastDays === 3) {
      for (let i = 0; i < temperatureNoForamt.length; i += 4) {
        const dayTemps = temperatureNoForamt.slice(i, i + 4);
        const avgTemp = dayTemps.reduce((acc, temp) => acc + temp, 0) / dayTemps.length;
        result.time.push(timeNoFormat[i].substring(8, 16));
        result.temperature.push(avgTemp);
      }
    }

    if (forecastDays === 7) {
      for (let i = 0; i < temperatureNoForamt.length; i += 24) {
        const dayTemps = temperatureNoForamt.slice(i, i + 24);
        const avgTemp = dayTemps.reduce((acc, temp) => acc + temp, 0) / dayTemps.length;
        result.time.push(timeNoFormat[i].substring(6, 10));
        result.temperature.push(avgTemp);
      }
    }
  }

  return result;
}

export default useFormatDate;


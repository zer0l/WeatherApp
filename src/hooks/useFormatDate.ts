// Кастомный хук для форматирования данных полученных от Api

interface FormattedData {
  time: string[];
  temperature: number[];
}


const useFormatDate = (timeNoFormat: string[], temperatureNoForamt: number[], forecastDays: number): FormattedData => {
  const result: FormattedData = {
    time: [],
    temperature: [],
  };

  if (forecastDays === 1) {
    return format24H(temperatureNoForamt, timeNoFormat, result);
  } else if (forecastDays === 3) {
    return formatDay(4, temperatureNoForamt, timeNoFormat, result);
  } else if (forecastDays === 7) {
    return formatDay(24, temperatureNoForamt, timeNoFormat, result);
  }

  return result;
}

const format24H = (temperature: number[], times: string[], result: FormattedData) => {

  const now = new Date();
  const Ago24H = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  times.forEach((time, index) => {
    const date = new Date(time);
    if (date >= Ago24H && date <= now) {
      result.time.push(time.substring(11, 16));
      result.temperature.push(temperature[index]);
    }
  });
  return result;
}

const formatDay = (step: number, temperature: number[], times: string[], result: FormattedData) => {

  for (let i = 24; i < temperature.length; i += step) {
    const dayTemps = temperature.slice(i, i + step);
    const avgTemp = dayTemps.reduce((acc, temp) => acc + temp, 0) / dayTemps.length;
    result.time.push(formatDDMM(times[i],step));
    result.temperature.push(avgTemp);
  }

  return result;

}

const formatDDMM = (timestamp: string, step:number): string => {
  const date = new Date(timestamp);

  return step < 24 ? date.toLocaleString('ru-RU', {hour:'numeric', minute: 'numeric', day: 'numeric'}) : date.toLocaleString('ru-RU', { day: 'numeric', month: 'numeric' });
  
};

export default useFormatDate;


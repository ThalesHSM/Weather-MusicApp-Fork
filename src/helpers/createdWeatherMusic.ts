import { v4 as uuid } from "uuid";

export function handleCreatedWeatherMusic(
  item: any,
  getTemperature: any,
  musicCategory: string
) {
  return {
    id: uuid(),
    saved: false,
    cityName: getTemperature.title,
    date: getTemperature.consolidated_weather[0].applicable_date
      .split("-")
      .reverse()
      .join("/"),
    temperature: JSON.stringify(getTemperature.consolidated_weather[0].the_temp)
      .slice(0, 2)
      .replace(".", ""),
    weatherImage: `https://www.metaweather.com/static/img/weather/${getTemperature.consolidated_weather[0].weather_state_abbr}.svg`,
    weatherName: getTemperature.consolidated_weather[0].weather_state_name,

    musicAuthor: item.track.subtitle,
    musicCategory: musicCategory,
    musicImage: item.track.images.coverart,
    musicName: item.track.share.subject,
    musicSpotifyLink: item.track.hub.providers[0].actions[0].uri,
    musicShazamLink: item.track.url,
  };
}

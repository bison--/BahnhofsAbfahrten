// @flow
import axios from 'axios';
import cheerio from 'cheerio';
import NodeCache from 'node-cache';
import qs from 'qs';

export const cache: NodeCache<string, ?Object> = new NodeCache();

export async function getLageplan(stationName: string) {
  const cached = cache.get(stationName);

  if (cached) return cached;
  // undefined = haven't tried yet
  // null = already tried to fetch, but nothing found
  if (cached === null) return null;
  const searchHtml: string = (await axios.get(
    `https://www.bahnhof.de/service/search/bahnhof-de/520608?${qs.stringify({
      query: stationName,
    })}`
  )).data;

  let $ = cheerio.load(searchHtml);
  const firstResultLink = $('#result .title > a')
    .first()
    .attr('href');

  if (!firstResultLink) {
    cache.set(stationName, null);

    return null;
  }

  const bahnhofHtml = (await axios.get(`https://www.bahnhof.de${firstResultLink}`)).data;

  $ = cheerio.load(bahnhofHtml);
  const rawPdfLink = $('.bahnhof > .embeddedDownload > .download-asset > a')
    .first()
    .attr('href');

  if (!rawPdfLink) {
    cache.set(stationName, null);

    return null;
  }
  const pdfLink = `https://www.bahnhof.de${rawPdfLink}`;

  cache.set(stationName, pdfLink);

  return pdfLink;
}
export function getCachedLageplan(stationName: string) {
  return cache.get(stationName);
}

import { BadRequest } from "../types/errors";
import Environment from "../Environment";

const { apiUrl } = Environment();

export const fetchTimeoutMs = 3000;

/*
    GET
 */

const hentJson = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch(err => {
      console.error(err);
      throw err;
    });

export const fetchAlerts = () => hentJson(`${apiUrl}/alerts`);

export const fetchInformation = () => hentJson(`${apiUrl}/information`);

export const fetchYourSituation = () =>
  hentJson(`${apiUrl}/whats-your-situation`);

export const fetchContexts = () => hentJson(`${apiUrl}/contexts`);

export const fetchRelated = () => hentJson(`${apiUrl}/related`);

export const fetchFrontpage = () => hentJson(`${apiUrl}/frontpage`);

/*
    Utils
 */

const parseJson = (data: any) => data.json();

const sjekkForFeil = async (url: string, response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text:
        response.status === 400
          ? await parseJson(response).then((data: BadRequest) => data.message)
          : response.statusText
    };
    throw error;
  }
};

export const timeoutPromise = (ms: number, msg?: string) =>
  new Promise((_, rej) => setTimeout(() => rej(msg), ms));


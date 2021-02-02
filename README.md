# Koronaveiviser

![Deploy-to-prod](https://github.com/navikt/koronaveiviser/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/koronaveiviser/workflows/Deploy-to-dev/badge.svg)

## Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/koronaveiviser.git
```

Installer nødvendige pakker:

```
npm install
```

Start applikasjonen lokalt:

```
npm start
```

## Deployering

- Dev - Tag på formatet `vX.X.X-dev`.
- Prod - Tag på formatet `vX.X.X-prod`.

Push den nye versjonen til GitHub og merge til master.

```
git push && git push --tags
```

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.

# Koronaveiviser

![Deploy-to-prod](https://github.com/navikt/koronaveiviser/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/koronaveiviser/workflows/Deploy-to-dev/badge.svg)

## Komme i gang

### Hent repoet fra github

```
git clone https://github.com/navikt/koronaveiviser.git
```

### Installer nødvendige pakker:

```
npm install
```

### Sett opp .env-fil

Du trenger en Sanity-bruker slik at du kan sette opp ditt eget token. Ta kontakt med et teammedlem eller #team-personbruker.

Når du har fått tilgang til Sanity, opprett din egen token (se seksjonen "Settings" i Sanity adminside). Kopier denne samt projectId som du også finner under "Settings".

Kopier environment-fil:

```
cp .env.sample .env
```

...og lim inn nevnte variabler inn i din nye .env.

### Starte Koronaveiviseren (3 steg):

#### 1. Start selve applikasjonen:

```
npm start
```

#### 2. Start server:

Du må også starte serveren lokalt som leverer innhold fra Sanity.io.

```
cd server
npm install
npm start
```

#### 3. Start dekoratøren

For å vise header og footer fra nav.no, må du også starte Dekoratøren.

```
docker-compose up -d
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

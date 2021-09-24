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

...og sett inn nevnte variabler inn i din nye .env.

### Starte Koronaveiviseren (3 steg):

#### 1. Start selve applikasjonen:

```
npm start
```

#### 2. Start api-tjenesten:

Du må også starte tjenesten lokalt som leverer innhold fra Sanity.io.

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

## Deploy til dev-miljø

[Deploy-to-dev](https://github.com/navikt/koronaveiviser/actions/workflows/deploy.dev.yml) -> Run workflow -> Velg branch -> Run workflow

## Prodsetting

Publiser en ny release på master for å starte deploy til prod

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.

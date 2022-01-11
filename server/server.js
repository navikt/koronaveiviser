// Load environment
require("console-stamp")(console, "[HH:MM:ss.l]");
require("dotenv").config();

const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const buildPath = path.resolve(__dirname, "../build");
const basePath = "/person/koronaveiviser";
const logger = require("./logger");
const sanityClient = require("@sanity/client");
const NodeCache = require("node-cache");

// Settings
const server = express();
const client = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET,
    token: process.env.SANITY_TOKEN,
    useCdn: false
});

// Cache setup
const cache = new NodeCache(
    {
        // Cleared each minute
        staging: { stdTTL: 60, checkperiod: 20 },
        production: { stdTTL: 60, checkperiod: 20 }
    }[process.env.SANITY_DATASET]
);

// Api
server.get(`${basePath}/api/alerts`, (req, res) => {
    const query = "*[_type == 'alert' " +
        "&& (displayOnAllPages == true || 'koronaveiviseren' in displayOnSpesificPages) " +
        "&& !(_id in path('drafts.**'))] {...}";

    const alerts = cache.get("alerts");
    if (alerts) {
        res.send(alerts);
    } else {
        client
            .fetch(query)
            .then(result => {
                cache.set("alerts", result);
                res.send(result);
            })
            .catch(error => res.send(error));
    }
});

server.get(`${basePath}/api/contexts`, (req, res) => {
    const query = "*[_type == 'context' && !(_id in path('drafts.**'))] {...}";
    const contexts = cache.get("context");
    if (contexts) {
        res.send(contexts);
    } else {
        client
            .fetch(query)
            .then(result => {
                cache.set("context", result);
                res.send(result);
            })
            .catch(error => res.send(error));
    }
});

server.get(`${basePath}/api/whats-your-situation`, (req, res) => {
    const query = "*[_id == 'whatsYourSituation' && !(_id in path('drafts.**'))] {...}";
    const whatsYourSituation = cache.get("whats-your-situation");
    if (whatsYourSituation) {
        res.send(whatsYourSituation);
    } else {
        client
            .fetch(query)
            .then(result => {
                cache.set("whats-your-situation", result);
                res.send(result);
            })
            .catch(error => res.send(error));
    }
});

server.get(`${basePath}/api/information`, (req, res) => {
    const query = "*[_type == 'infopanel' && !(_id in path('drafts.**'))] {...}";
    const information = cache.get("information");
    if (information) {
        res.send(information);
    } else {
        client
            .fetch(query)
            .then(result => {
                cache.set("information", result);
                res.send(result);
            })
            .catch(error => res.send(error));
    }
});

server.get(`${basePath}/api/related`, (req, res) => {
    const query = "*[_id == 'related' && !(_id in path('drafts.**'))] {...}";
    const related = cache.get("related");
    if (related) {
        res.send(related);
    } else {
        client
            .fetch(query)
            .then(result => {
                cache.set("related", result);
                res.send(result);
            })
            .catch(error => res.send(error));
    }
});

server.get(`${basePath}/api/frontpage`, (req, res) => {
    const query = "*[_id == 'frontpage' && !(_id in path('drafts.**'))] {...}";
    const frontpage = cache.get("frontpage");
    if (frontpage) {
        res.send(frontpage);
    } else {
        client
            .fetch(query)
            .then(result => {
                cache.set("frontpage", result);
                res.send(result);
            })
            .catch(error => res.send(error));
    }
});

// Cache debug
cache.on("set", key => console.log(`Setting cache ${key}`));
cache.on("del", key => console.log(`Clearing cache ${key}`));

// Parse application/json
server.use(express.json());
server.use(basePath, express.static(buildPath, { index: false }));
server.get(`${basePath}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static|api)\/).*$/, (req, res) => {
    getHtmlWithDecorator(`${buildPath}/index.html`)
        .then((html) => {
            res.send(html);
        })
        .catch((e) => {
            logger.error(e);
            res.status(500).send(e);
        });
});

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));

process.on("SIGTERM", () =>
  setTimeout(() => logger.info("Har sovet i 30 sekunder"), 30000)
);

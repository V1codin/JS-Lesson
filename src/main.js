import InitElements from "./Init";

const projectSettings = require("./API Setts.json");

const elemSettings = require("./HTML Elements.json");

const initBlock = new InitElements(elemSettings, projectSettings);

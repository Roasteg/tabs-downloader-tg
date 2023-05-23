import { Composer } from "telegraf";

module.exports = Composer.compose([
    require('./search/search'),
])
import { Composer } from "telegraf";

module.exports = Composer.compose([
    require('./search/search.command'),
    require('./download/download.command')
])
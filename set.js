const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0F5bmgrSTgvRi9XdE41Q0dnYXYrVzhPUU95Rk1QRnRwam56SDdVdk8yUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibEF6dWN5aVB4d0xqTWlEWTRrYjQ5RGpvVnFzeDlIWGlPWVVwbk4rcGlBQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRlVjQUZZNFJLZHJoN2xEbDBJemdTOXVWWnY0UWxiZFdzK1JoVGYrUVVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3NXdKOXpqVGJxMXdydWZoN3B1bld1WllGampPMndGbytGSVRXUHNOS3pvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFFRXY5N0xjSlU1MVJFdG1xUStLbmo5c0J1dFlJZHJqbE12ZEg1U1VyR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im82YW1RWDZobHlFeE5wS3lINktxOXc4QkpXbDFNanNBdlcrVDNtV0cxRHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0pUeGEvTG50T2VBMG5oMllQbVVkQjB3K25OdC9OUUtvc3hncHdUaTdVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRzhlR1NUREloSXQ4K2VpUTJpNzRqVjFIblVoaDlXVHJLSG1qajdrTkZEQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxzbzZhMDVwUmtNM0l0N0NCTTlSVi9EWVBoYmNrd1N2NGdTa2VxRFNuRTQ4dEFjRHB6RVZEWTBsUkNCN2pIRVU2bTByZ2pTUGRHeHBTME1nQ0JlNkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ5LCJhZHZTZWNyZXRLZXkiOiJYZzROM1habUtMcTBZSHV4MERmbXFpNmdRaFdLbnpUWkFmajl1WXVobHhnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI0MTA3MTY0NzMyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjE5Q0MxODE1OEVBRThCOTg1QjNEQjhCMUJCNzAzNkI0In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDExMjk2MzV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI0MTA3MTY0NzMyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkI5RDczMTk1QTREMkE2MUU4MzVGNTNDNTExMzJGOTZCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDExMjk2NDB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImljdEhYM1h6U01TMFBrT1JRaV84OGciLCJwaG9uZUlkIjoiZTM5OTFmZWEtNjJkNC00MDNkLWFjZGUtZDlmNTJkMDQ3MTQyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllyYW55eWl0ZUdYbThvb3UxM1pFU1RHSkI3Yz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2KzdGa2dVUE0zaTZBRDRjUVN0M1I2S1NCYjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWkE3QlM5NFoiLCJtZSI6eyJpZCI6IjI0MTA3MTY0NzMyOjJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J+MueKcn2pvcmRhbiDwnZeU8J2Xo/Cdl6fwn4y5In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMLzEyckFDRUpDUG5yNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJhOFlKVlQ2NEdDMzJnWGtPK3RNOFNsdmxBandXaFJnTHZSM0RGNlp0a0RzPSIsImFjY291bnRTaWduYXR1cmUiOiJodXlJbkd5QmU3K3VveHZVb2JwbTd5bEEzVFBqc2VNN3ZWMG1SNEt2c3ovbWk3ajFoREQvcGNGRjMwTFc0NDVWNnJkcmdTbkltUGlZd0thaG8rbmNEdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQWpkT2ZnVzJxeXFUVEZLb09WWldaRFlaOXFyc0dvZlBETUdsUFpTaGErZkxmRVk0TjZwZnV1NUZmUjBtdjZ5WG0yOVZkTEZ0Y0tlY2pQNml2ZWVFREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNDEwNzE2NDczMjoyQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQld2R0NWVSt1Qmd0OW9GNUR2clRQRXBiNVFJOEZvVVlDNzBkd3hlbWJaQTcifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDExMjk2MzAsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSFRMIn0=',
    PREFIXES: (process.env.PREFIX || '✓').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "🌹✟jordan 𝗔𝗣𝗧🌹",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "24107164732",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "off",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || 'on',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Gabon',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

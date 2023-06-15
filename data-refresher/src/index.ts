import * as z from 'zod';
import { GoogleSpreadsheet } from "google-spreadsheet";
import { config } from "dotenv";

const environmentSchema = z.object({
    GOOGLE_SHEET_ID: z.string(),
    GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string(),
    GOOGLE_PRIVATE_KEY: z.string(),
});

config();
const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = environmentSchema.parse(process.env);

const rowSchema = z.object({
    date: z.date(),
    capacity: z.number()
});
type Row = z.infer<typeof rowSchema>;


const getData = async (): Promise<Row[]> => {

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: GOOGLE_PRIVATE_KEY,
    });
    await doc.loadInfo();

    const sheet = await doc.sheetsByTitle["Data"];

    const rows = await sheet.getRows();

    return rows.map((row) => rowSchema.parse({ date: new Date(row.Time), capacity: Number(row.Capacity) }));
};

const SAVE_FILE_LOCATION = "../frontend/src/assets/data.json";

getData().then((rows) => {
    console.log("Got data", rows);
    const fs = require("fs");
    fs.writeFileSync(SAVE_FILE_LOCATION, JSON.stringify(rows));
});


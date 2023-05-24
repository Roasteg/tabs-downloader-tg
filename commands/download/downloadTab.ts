import axios from "axios";
import { writeFile } from "fs";

export default async function downloadTab(tabId: string) {
    const revisions = await axios.get<{ source: string }[]>(
        `https://www.songsterr.com/api/meta/${tabId}/revisions`
    );
    const response = await axios.get(revisions.data[0].source, {
        responseType: "arraybuffer",
        headers: {
            "Content-Type": "application/guitar-pro5",
        },
    });
    const buffer = Buffer.from(response.data);

    await writeFile(tabId + ".gp5", buffer, () => {});
}

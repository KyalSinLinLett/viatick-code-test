const fs = require("fs");

const jumpToByteOffset = (file_path, byte_offset) => {
    const file = fs.openSync(file_path, "r");
    const buffer = Buffer.alloc(8);
    fs.readSync(file, buffer, 0, 8, byte_offset);
    const data = buffer.toString("hex");
    const hexPart = data.substr(0, 8);
    const remainingData = Buffer.from(data.substr(8), "hex").toString("utf8");
    const intValue = parseInt(hexPart, 16);
    fs.closeSync(file);
    return [hexPart, remainingData, intValue];
};

const jumpToByteOffsetGPS = (file_path, byte_offset) => {
    const file = fs.openSync(file_path, "r");
    const buffer = Buffer.alloc(16);
    fs.readSync(file, buffer, 0, 16, byte_offset);
    const data = buffer.toString("hex");
    const index = parseInt(data.substr(0, 8), 16);
    const size = parseInt(data.substr(8, 8), 16);
    fs.closeSync(file);
    return [index, size];
};

const toArrayBuffer = (buffer) => {
    const arrayBuffer = new ArrayBuffer(buffer.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return arrayBuffer;
};

const peek = (file_path, index, length) => {
    const file = fs.openSync(file_path, "r");
    const buffer = Buffer.alloc(length);
    fs.readSync(file, buffer, 0, length, index);
    fs.closeSync(file);
    return toArrayBuffer(buffer);
};

const getGPSRecordPoints = (dataview) => {
    const OFFSET = 48;
    const HOUR = dataview.getUint32(OFFSET + 0, true);
    const MINUTE = dataview.getUint32(OFFSET + 4, true);
    const SECOND = dataview.getUint32(OFFSET + 8, true);
    const YEAR = dataview.getUint32(OFFSET + 12, true);
    const MONTH = dataview.getUint32(OFFSET + 16, true);
    const DAY = dataview.getUint32(OFFSET + 20, true);
    const STATUS = String.fromCharCode(dataview.getUint8(OFFSET + 21));
    const NS_IND = String.fromCharCode(dataview.getUint8(OFFSET + 22));
    const EW_IND = String.fromCharCode(dataview.getUint8(OFFSET + 23));
    const RESERVD = String.fromCharCode(dataview.getUint8(OFFSET + 24));
    const LATITUDE = dataview.getFloat32(OFFSET + 28, true);
    const LONGITUDE = dataview.getFloat32(OFFSET + 32, true);
    const SPEED = dataview.getFloat32(OFFSET + 36, true);
    const ANGLE = dataview.getFloat32(OFFSET + 40, true);
    return {
        hour: HOUR,
        minute: MINUTE,
        second: SECOND,
        year: YEAR,
        month: MONTH,
        day: DAY,
        status: Buffer.from(STATUS, "hex") || "NA",
        ns_ind: Buffer.from(NS_IND, "hex") || "NA",
        ew_ind: Buffer.from(EW_IND, "hex") || "NA",
        reservd: Buffer.from(RESERVD, "hex") || "NA",
        lat: LATITUDE,
        lon: LONGITUDE,
        speed: SPEED,
        angle: ANGLE,
    };
};

const run = (FILE_PATH) => {
    let ptr = 0;
    let ctr = 0;
    let gpsRecords = [];
    while (true) {
        const [atom_size, atom_type, offset] = jumpToByteOffset(FILE_PATH, ptr);
        console.log("here>>", atom_size, atom_type, offset);

        // failsafe
        // if (atom_size === "00000000") {
        //     return "failed"
        // }

        if (atom_type === "moov") {
            console.log("moov atom detected");
            // console.log(offset, ptr + offset, ptr);

            while (offset < ptr + offset) {
                const [atom_size, atom_type, offset] = jumpToByteOffset(
                    FILE_PATH,
                    ptr + 8
                );
                console.log(atom_size, atom_type, offset);

                if (atom_type === "gps ") {
                    console.log("gps atom detected");
                    idx = 16;
                    start = true;
                    while (true) {
                        const [index, size] = jumpToByteOffsetGPS(
                            FILE_PATH,
                            ptr + idx
                        );
                        if (start) {
                            start = false;
                            ctr = size;
                            continue;
                        }
                        // ctr++;
                        if (index === 0 || size === 0) {
                            break;
                        }

                        const gpsData = peek(FILE_PATH, index, size);
                        const dataview = new DataView(gpsData);
                        const gpsRecord = getGPSRecordPoints(dataview);
                        gpsRecords.push(gpsRecord);

                        idx += 8;
                    }
                    break;
                }
                ptr += offset;
            }
            break;
        }
        ptr += offset;
    }
    console.log(ctr, "gps datapoints extracted and saved to DB");
    return gpsRecords;
};

module.exports = run;

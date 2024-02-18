import fs from 'fs';

export function writeCSV(path: string, header: string[], map: Map<number, string[]>) {
    const writer = fs.createWriteStream(path);
    writer.write(header.join().concat('\n'));
    for (let i = map.size - 1; i >= 0; i--)
      writer.write(map.get(i)?.join().concat('\n'));
    writer.end();
}

export function compareCSVColumnValues(path: string[]) {
  const file1 = fs.readFileSync(path[0], 'utf-8');
  const file2 = fs.readFileSync(path[1], 'utf-8');
  const rows1 = file1.split('\n');
  const rows2 = file2.split('\n');
  rows1.shift();
  rows2.shift();
  return [rows1,rows2];
}
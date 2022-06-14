import * as fs from "fs";

export class IOFile<T> {
    public readFile = (filename:string):Array<string> => {
        let objs = Array();
        const read = fs.readFileSync(filename, 'utf-8');
        read.split(/\r?\n/).forEach(line =>  {
            objs.push(line);
        });
        return objs;
    }
    public writeFile(filename: string, objs:Array<T>){
        // const write = fs.createWriteStream(filename, 'utf-8');
        // objs.forEach(item => write.write(`${item.toString()}\r\n`));
        fs.writeFileSync(filename, objs.join('\n'), 'utf-8');
    }

}

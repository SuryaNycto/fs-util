const fs=require("fs").promises;
const streams=require("fs");
const path=require("path");

async function fread(fn)
{
    try {
        let data=await fs.readFile(path.join(__dirname,fn),"utf-8")
        return data;
      
        
    } catch (error) {
        console.error(error.message)
    }
}

async function fwrite(from,to)
{
    try {
        const data=await fread(from)
         await fs.writeFile(path.join(__dirname,to),data)
       
    } catch (error) {
        console.error(error.message)
    }
}

async function fappend(to,data)
{
    try {
        await fs.appendFile(path.join(__dirname,to),"\n\n"+data)

    } catch (error) {
        console.error(error.message)
    }


}

async function frename(from,to)
{
    try {
        await fs.rename(path.join(__dirname,from),path.join(__dirname,to));
        
    } catch (error) {
        console.error(error.message)
    }
}

async function fdelete(fn)
{
    try {
        await fs.unlink(path.join(__dirname,fn))

    } catch (error) {
        console.error(error.message)
    }


}


async function freadLarge(fn)
{
    try {
           const rs= await streams.createReadStream(path.join(__dirname,fn),{encoding:"utf-8"})
           return rs;
    } catch (error) {
        console.error(error.message)
    }
}

async function fwriteLarge(from,to)
{
    const ws=streams.createWriteStream(path.join(__dirname,to));
    const data=await freadLarge(from)
    data.on("data",(decoded)=>{ws.write(decoded)})


}

async function pipe(from,to)
{
 const rs=streams.createReadStream(path.join(__dirname,from),{encoding:"utf-8"})
 const ws=streams.createWriteStream(path.join(__dirname,to))
 rs.pipe(ws)

}

module.exports={fread,fwrite,fappend,frename,fdelete,freadLarge,fwriteLarge,pipe};
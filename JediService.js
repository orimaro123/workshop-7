const fs = require("fs").promises;
const jediFile = "jedi_list.json";

//async function replaceJedi(jediId, jedi) {
  //TODO write logic replacing jedi by it's id with newly passed jedi
//}

async function deleteJedi(jediId) {
  //TODO Delete jedi by given id in our file

  const data = await readJediFile();
  const dataFiltered = data.filter((jedi) => jedi.id != jediId);
  await writeJediFile(dataFiltered);
  return;
}

async function getAll() {
  //TODO obtain all saved jedis and return it to callee
}

async function addJedi(jedi) {
  let data = await readJediFile();
  
  if (!data) {
    data = [];
  
  }
  //check max id
  //new is == max id + 1
  //jedi.setId(data.length)

  const maxId = Math.max(...data.map(jedi => jedi.id))
  
  jedi.id = maxId + 1
  data.push(jedi);
  await writeJediFile(data);
}

async function getJedi(id) {
  const data = await readJediFile();
  return data.find((value) => value.id === id);
}

async function getJediByName(name) {
  const data = await readJediFile();
 
  return data.find((value) => value.name === name);
}

async function getAllJedi() {
  const data = await readJediFile();
  return data;
}


async function deleteJedi(id) {
  //TODO Delete jedi by given id in our file

  const data = await readJediFile();
  const dataFiltered = data.filter((jedi) => jedi.id !== id);
  await writeJediFile(dataFiltered);

}


async function replaceJedi(nameToreplace, newName) {
  //TODO Delete jedi by given id in our file

  const data = await readJediFile();
  const foundJediIndex = data.findIndex((jedi => jedi.name === nameToreplace))
  //console.log("this is the index of your jedi: " , foundJediIndex)
  data[foundJediIndex].name = newName 
  //console.log(data)
 await writeJediFile(data);

}



async function readJediFile() {
  try {
    const data = await fs.readFile(jediFile);
   
    return JSON.parse(data.toString());
  } catch (error) {
    console.error(`Got an error trying to read the file: ${error.message}`);
  }
}

async function writeJediFile(content) {
  try {
    await fs.writeFile(jediFile, JSON.stringify(content));
  } catch (error) {
    console.error(`Failed to write to file ${error.message}`);
  }
}

module.exports = {
  addJedi,
  getJedi,
  getJediByName,
  getAllJedi,
  replaceJedi,
  deleteJedi,
};

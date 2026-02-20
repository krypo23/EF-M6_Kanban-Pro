const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../../data.json');
const leerArchivo = () => {
    try {
        const leerArchivo = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(leerArchivo);
    } catch (error) {
        console.error("Error leyendo el archivo JSON:", error);
        return null;
    }
};

const escribirArchivo = (data) => {
    try {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error("Error escribiendo en el archivo JSON:", error);
        return false;
    }
};

module.exports = { leerArchivo, escribirArchivo };
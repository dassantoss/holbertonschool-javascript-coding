// full_server/utils.js
import fs from 'fs';

export function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (error, data) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      } else {
        const students = data
          .split('\n')
          .filter((student) => student.trim() !== '')
          .map((student) => student.split(','))
          .reduce((result, [firstName, , , field]) => {
            if (!result[field]) {
              result[field] = [];
            }
            result[field].push(firstName);
            return result;
          }, {});

        resolve(students);
      }
    });
  });
}

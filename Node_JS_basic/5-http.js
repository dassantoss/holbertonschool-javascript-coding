const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  if (req.url === '/') {
    res.end('Hello Holberton School!\n');
  } else if (req.url === '/students') {
    const databaseFile = process.argv[2];

    if (!databaseFile) {
      res.end('This is the list of our students\nCannot load the database\n');
    } else {
      const database = fs.readFileSync(databaseFile, 'utf8');
      const students = database
        .split('\n')
        .map((student) => student.split(','))
        .filter((student) => student.length === 4 && student[0] !== 'firstname')
        .map((student) => ({
          firstName: student[0],
          lastName: student[1],
          age: student[2],
          field: student[3],
        }));

      const csStudents = students
        .filter((student) => student.field === 'CS')
        .map((student) => student.firstName);
      const sweStudents = students
        .filter((student) => student.field === 'SWE')
        .map((student) => student.firstName);

      res.write('This is the list of our students\n');
      res.write(`Number of students: ${students.length}\n`);
      res.write(`Number of students in CS: ${csStudents.length}. List: ${csStudents.join(', ')}\n`);
      res.write(`Number of students in SWE: ${sweStudents.length}. List: ${sweStudents.join(', ')}\n`);
      res.end();
    }
  } else {
    res.end('Not Found\n');
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;

// full_server/controllers/StudentsController.js
import { readDatabase } from '../utils';

class StudentsController {
  static async getAllStudents(req, res) {
    try {
      const students = await readDatabase(req.app.locals.database);

      res.status(200).send(`This is the list of our students\n${formatStudents(students)}`);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getAllStudentsByMajor(req, res) {
    const major = req.params.major.toUpperCase();
    if (major !== 'CS' && major !== 'SWE') {
      res.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    try {
      const students = await readDatabase(req.app.locals.database);

      if (!students[major]) {
        res.status(200).send(`No students in ${major}`);
      } else {
        const studentList = students[major].join(', ');
        res.status(200).send(`List: ${studentList}`);
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

function formatStudents(students) {
  const formattedStudents = [];
  for (const major in students) {
    formattedStudents.push(`Number of students in ${major}: ${students[major].length}. List: ${students[major].join(', ')}`);
  }
  return formattedStudents.join('\n');
}

export default StudentsController;

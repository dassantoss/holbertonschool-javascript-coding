#!/usr/bin/node

const request = require('request');

const url = process.argv[2];

request(url, function (err, response, body) {
  if (err) console.log(err);
  const result = {};
  JSON.parse(body)
    .filter((task) => task.completed)
    .map(
      (task) => {
        if (!(task.userId in result)) { result[task.userId] = 1; } else { result[task.userId] += 1; }
        return task;
      }
    );
  console.log(result);
});

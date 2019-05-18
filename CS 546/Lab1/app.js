//Donald Tang
//Pledge: I pledge my honor I have abided by the Stevens Honor System.

const todo = require("./todo");
const uuid = require('uuid/v4');
const connection = require("./mongoConnection");

const main = async () => {

  const task1 = await todo.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");
  console.log("Task1 has been added!");
  console.log(task1);

  const task2 = await todo.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");
  
  const taskList = await todo.getAllTasks();
  console.log("These are all of the current tasks!");
  console.log(taskList);
  
  await todo.removeTask(task1._id);
  console.log("Removed the first task!");
  const taskList2 = await todo.getAllTasks();
  console.log("These are the remaining tasks!");
  console.log(taskList2);

  const completedTask = await todo.completeTask(task2._id);
  console.log("Completed remaining task!");
  console.log(completedTask);
  
  const db = await connection();
  await db.serverConfig.close();

  console.log("Done!");
};

main().catch(error => {
  console.log(error);
});
const mongoCollections = require("./mongoCollections");
const uuidv4 = require('uuid/v4');
const todo = mongoCollections.todo;

module.exports = {
  // This is a fun new syntax that was brought forth in ES6, where we can define
  // methods on an object with this shorthand!

    async createTask(title, description) {
        if (!title) throw "You must provide a title for your task";

        if (!description) throw "You must provide a description for your task";

        const todoItemsCollection = await todo();

        let newTask = {
            _id: uuidv4(),
            title: title,
            description: description,
            completed: false,
            completedAt: null
        };

        const insertInfo = await todoItemsCollection.insertOne(newTask);
        if (insertInfo.insertedCount === 0) throw "Could not add task";

        const newId = insertInfo.insertedId;

        const task = await this.getTask(newId);
        return task;
    },

    async getAllTasks() {
        const todoItemsCollection = await todo();

        const tasks = await todoItemsCollection.find({}).toArray();

        return tasks;
    },

    async getTask(id) {
        if (!id) throw "You must provide an id to search for";

        const todoItemsCollection = await todo();
        const task = await todoItemsCollection.findOne({ _id: id });
        if (task === null) throw "No task with that id";

        return task;
    },

    async completeTask(taskId) {
        if (!taskId) throw "You must provide an taskId";
    
        var timeNow = Date();
        const todoItemsCollection = await todo();
        /*const updatedTask = {
          completed: true,
          completedAt: 8
        };*/
        const updatedTask = { 
            $set: {completed: true, completedAt: timeNow} 
        };
    
        await todoItemsCollection.updateOne({ _id: taskId }, updatedTask);
        //const updateInfo = await todoItemsCollection.updateOne({ _id: taskId }, updatedTask);
       /*if (updatedInfo.modifiedCount === 0) {
          throw "could not update task successfully";
        }*/
    
        return await this.getTask(taskId);
    },

    async removeTask(id) {
        if (!id) throw "You must provide an id to search for";

        const todoItemsCollection = await todo();
        const deletionInfo = await todoItemsCollection.removeOne({ _id: id });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete task with id of ${id}`;
        }

        return true;
    }
};
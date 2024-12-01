const Task = require('../models/taskModel.js');
const User = require('../models/userModel.js');

async function createTaskForUser(req, res) {
    try {
      
      // Check for 'user' role
      if (req.user.role !== "user") {
        res.status(403); // Forbidden
        throw new Error("Access denied. User does not have the required role");
      }

      // Validate required task data fields
      const { userId, title, description, due_date, priority } = req.body;
      
      if (!userId ||!title || !description || !due_date || !priority) {
        throw new Error('All task fields are required.');
      }
  
      // Check if the user exists
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found.');
      }
  
      // Validate priority
      const validPriorities = ['high', 'medium', 'low'];
      if (!validPriorities.includes(priority)) {
        throw new Error(`Invalid priority. Valid priorities are: ${validPriorities.join(', ')}`);
      }
  
      // Create and save the new task
      const task = new Task({
        title,
        description,
        due_date,
        priority,
        user: userId, // Associate the task with the user
      });
  
      await task.save();
  
      
        res.status(201).json({
          "message": 'Task created successfully.'})
        
      
    } catch (error) {
      console.error('Error creating task:', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async function getAllTask(req,res) {
        try {

            // Check for 'user' role
            if (req.user.role !== "user") {
              res.status(403); // Forbidden
              throw new Error("Access denied. User does not have the required role");
            }
            const { page = 1, limit = 9, status, priority,  user_id } = req.query;
    
            const query = { user: user_id }; // Filter by user_id
            if (status) query.status = status;
            if (priority) query.priority = priority;

            // Fetch the total count of tasks for pagination
            const totalTasks = await Task.countDocuments(query);

            const tasks = await Task.find(query)
              .skip((page - 1) * limit)
              .limit(Number(limit))
              .populate('user', 'name email role');

            const totalPages = Math.ceil(totalTasks / limit);

            res.status(200).json({ tasks,
              totalPages,
              currentPage: Number(page)});

          } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
          }
    
    }
    
    
    async function getTaskById(req,res) {
    
        try {

            // Check for 'user' role
            if (req.user.role !== "user") {
              res.status(403); // Forbidden
              throw new Error("Access denied. User does not have the required role");
            }
    
            const { id } = req.query;
    
            const task = await Task.findById(id).populate('user', 'name email role');
    
            if (!task) {
  
              return res.status(404).json({ message: 'Task not found.' });
  
            }
    
            res.status(200).json({ task });
    
          } catch (error) {
    
            res.status(500).json({ message: 'Server error', error: error.message });
    
          }
    
    }
    

    async function updateTask(req,res) {
    
        try {

            // Check for 'user' role
            if (req.user.role !== "user") {
              res.status(403); // Forbidden
              throw new Error("Access denied. User does not have the required role");
            }
    
            const { id } = req.query;
    
            const updates = req.body;
    
            const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    
            if (!task) {
    
              return res.status(404).json({ message: 'Task not found.' });
    
            }
    
            res.status(200).json({ message: 'Task updated successfully.' });
    
          } catch (error) {
    
            res.status(500).json({ message: 'Server error', error: error.message });
    
          }
    
    }
    
    
    async function deleteTask(req, res) {
    
        try {

            // Check for 'user' role
            if (req.user.role !== "user") {
              res.status(403); // Forbidden
              throw new Error("Access denied. User does not have the required role");
            }
    
            const { id } = req.query;
    
            const task = await Task.findByIdAndDelete(id);
    
            if (!task) {
    
              return res.status(404).json({ message: 'Task not found.' });
    
            }
    
            res.status(200).json({ message: 'Task deleted successfully.' });
    
          } catch (error) {
    
            res.status(500).json({ message: 'Server error', error: error.message });
    
          }
    
    }
    
    
    async function updateTaskStatus(req, res) {
    
        try {

            // Check for 'user' role
            if (req.user.role !== "user") {
              res.status(403); // Forbidden
              throw new Error("Access denied. User does not have the required role");
            }
    
            const { id } = req.query;
    
            const { status } = req.body;
    
            const validStatuses = ['pending', 'completed'];
    
            if (!validStatuses.includes(status)) {
    
              return res.status(400).json({ message: 'Invalid status.' });
    
            }
    
            const task = await Task.findByIdAndUpdate(id, { status }, { new: true });
    
            if (!task) {
    
              return res.status(404).json({ message: 'Task not found.' });
    
            }
    
            res.status(200).json({ message: 'Task status updated successfully.' });
    
          } catch (error) {
    
            res.status(500).json({ message: 'Server error', error: error.message });
    
          }
    
    }
    
    
    async function updateTaskPriority(req, res) {
    
        try {

            // Check for 'user' role
            if (req.user.role !== "user") {
              res.status(403); // Forbidden
              throw new Error("Access denied. User does not have the required role");
            }
    
            const { id } = req.query;
    
            const { priority } = req.body;
    
            const validPriorities = ['high', 'medium', 'low'];
    
            if (!validPriorities.includes(priority)) {
    
              return res.status(400).json({ message: 'Invalid priority.' });
    
            }
    
            const task = await Task.findByIdAndUpdate(id, { priority }, { new: true });
    
            if (!task) {
    
              return res.status(404).json({ message: 'Task not found.' });
    
            }
  
            res.status(200).json({ message: 'Task priority updated successfully.' });
    
          } catch (error) {
    
            res.status(500).json({ message: 'Server error', error: error.message });
    
          }
    
    }
    
    
      module.exports={createTaskForUser, getAllTask, getTaskById, updateTask, deleteTask, updateTaskStatus, updateTaskPriority};
  
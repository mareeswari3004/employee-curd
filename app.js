import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Employee from './models/employeeModel.js'

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017")
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

// ✅ CRUD Routes

// ➕ Create Employee
app.post("/employees", async (req, res) => {
  const { name, position, department, salary, joiningDate } = req.body;
  const newEmployee = new Employee({ name, position, department, salary, joiningDate });
  await newEmployee.save();
  res.json({ message: "✅ Employee Created Successfully!" });
});

// 📄 Get All Employees
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// 🔍 Get Single Employee
app.get("/employees/:id", async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  res.json(employee);
});

// 🖊 Update Employee
app.put("/employees/:id", async (req, res) => {
  const { name, position, department, salary, joiningDate } = req.body;
  await Employee.findByIdAndUpdate(req.params.id, { name, position, department, salary, joiningDate });
  res.json({ message: "🖊 Employee Updated Successfully!" });
});

// ❌ Delete Employee
app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "❌ Employee Deleted Successfully!" });
});

// ✅ Start Server
app.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000/");
});

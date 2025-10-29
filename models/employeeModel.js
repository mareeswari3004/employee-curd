import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  department: String,
  salary: Number,
  joiningDate: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
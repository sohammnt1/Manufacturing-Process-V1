import { hash, compare } from "bcryptjs";
import employeeRepo from "./employee.repo";
import { generateToken } from "../../utility/jwt";
import { IEmployee } from "./employee.types";
import { generate } from 'generate-password'
import * as shortid from 'shortid';
import sgMail from '@sendgrid/mail'

const createEmployee = async (employee: IEmployee) => {
    try {
        let password = generate({ length: 10, numbers: true });
        let employeeId = shortid.generate()
        const hashedPassword = await hash(password, 12);
        const employeeData = { ...employee, ['password']: hashedPassword, employeeId: employeeId, deleted: false };
        const result = await employeeRepo.create(employeeData);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY!)
        const msg = {
            from: "sohammunot2@gmail.com",
            to: employeeData.email,
            subject: 'Account Sucessfully Created',
            text: `Dear,${employeeData.name}. Your Account has been created here are the login credentials. EmployeeId: ${employeeData.employeeId} Password:${password}`
        }
        const a=await sgMail.send(msg)
        if(a){
        console.log('Email sent')}
        return result
    } catch (error) {
        throw error;
    }
}

const authenticateEmployee = async (employeeId: string, password: string) => {
    try {
        const employee = await employeeRepo.getOne(employeeId);
        if (!employee) throw new Error('Employee doesn\'t exists');
        const doMatch = await compare(password, employee.password);
        if (!doMatch) throw new Error('Invalid Password');
        const result = generateToken(employee);
        return result;
    } catch (error) {
        throw error;
    }
}

const displayEmployees = async (role: any) => {
    try {
        let result
        if (role) {
            result = employeeRepo.getbyRole(role.trim());
        }
        else {
            result = employeeRepo.getAll();
        }
        return result;
    } catch (error) {
        throw error;
    }
}

const editEmployee = async (updated_data: IEmployee) => {
    try {
        const result = await employeeRepo.update(updated_data);
        return result;
    } catch (error) {
        throw error;
    }
}

const deleteEmployee = async (employeeId: string) => {
    try {
        const result = await employeeRepo.deleteOne(employeeId);
        return result;
    } catch (error) {
        throw error;
    }
}


export default {
    createEmployee,
    authenticateEmployee,
    displayEmployees,
    editEmployee,
    deleteEmployee
}
package com.library.bookstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;



@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class EmployeeController {

	@Autowired
	private EmployeeService serv;
	
	@GetMapping("/employee")
	public Iterable<Employee> getEmployees()
	{
		return serv.findAll();
	}
	
	@PostMapping("/employee")
	public ResponseEntity<String> postEmployeeData(@RequestBody Employee emp)
	{
		serv.save(emp);
		return new ResponseEntity<String>("Employee Data Posted Successfully",HttpStatus.CREATED);
		//201
	}
	
	@GetMapping("/employee/name")
	public Iterable<Employee> searchByName(@RequestParam("firstName") String fName, @RequestParam("lastName")String lName)
	{
		if(lName.equals("")&& fName.equals(""))
			return serv.findAll();
		else if(lName.equals(""))
			return serv.findByEmpFirstName(fName);
		else if(fName.equals(""))
			return serv.findByEmpLastName(lName);
		else
			return serv.findByEmpFirstNameAndEmpLastName(fName, lName);
		
	}
	@GetMapping("/employee/username/{username}")
	public Iterable<Employee> searchByUserName(@PathVariable("username") String username)
	{
		return serv.findByEmpUser(username);
	}
	
	@PutMapping("/employee")
	public ResponseEntity<String> updateEmployeeData(@RequestBody Employee emp)
	{
		serv.save(emp);
		return new ResponseEntity<String>("Data Updated Successfully",HttpStatus.OK);
	}
	
	
	
}

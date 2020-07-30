package com.library.bookstore;

import org.springframework.data.repository.CrudRepository;


public interface EmployeeService extends CrudRepository<Employee, Integer> {

	public Iterable<Employee> findByEmpFirstNameAndEmpLastName(String fName,String lName);
	public Iterable<Employee> findByEmpFirstName(String fName);
	public Iterable<Employee> findByEmpLastName(String lName);
	
	public Iterable<Employee> findByEmpUser(String empUser);
	
}

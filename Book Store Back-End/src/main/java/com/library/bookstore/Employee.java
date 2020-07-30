package com.library.bookstore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;


@Entity
public class Employee {

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO, generator = "emp_gen")
	@SequenceGenerator(name = "emp_gen", sequenceName = "emp_gen", initialValue = 1, allocationSize = 1)
	private int empId;
	
	private String empFirstName;
	private String empLastName;
	private String empAddress;
	private String empUser;
	public int getEmpId() {
		return empId;
	}
	public void setEmpId(int empId) {
		this.empId = empId;
	}
	
	public String getEmpFirstName() {
		return empFirstName;
	}
	public void setEmpFirstName(String empFirstName) {
		this.empFirstName = empFirstName;
	}
	public String getEmpLastName() {
		return empLastName;
	}
	public void setEmpLastName(String empLastName) {
		this.empLastName = empLastName;
	}
	public String getEmpAddress() {
		return empAddress;
	}
	public void setEmpAddress(String empAddress) {
		this.empAddress = empAddress;
	}
	public String getEmpUser() {
		return empUser;
	}
	public void setEmpUser(String empUser) {
		this.empUser = empUser;
	}
		
}

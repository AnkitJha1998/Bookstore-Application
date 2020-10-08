package com.library.bookstore;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.library.bookstore.controller.EmployeeController;
import com.library.bookstore.entity.Employee;
import com.library.bookstore.service.EmployeeService;

class EmployeeControllerTest {

	@Mock
	EmployeeService empServ;
	
	@InjectMocks
	EmployeeController empCon;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetEmployees()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		
		Employee emp1=new Employee();
		emp1.setEmpId(2);
		emp.setEmpFirstName("Employee1");
		emp.setEmpLastName("LastName1");
		emp.setEmpUser("empUser1");
		emp.setEmpAddress("New CG Road Ahmedabad1");
		
		ArrayList<Employee> list=new ArrayList<Employee>();
		list.add(emp);
		list.add(emp1);
		
		Mockito.when(empServ.findAll()).thenReturn(list);
		
		ArrayList<Employee> recv=(ArrayList<Employee>) empCon.getEmployees();
		
		assertEquals(recv.size(),2);
	}
	
	@Test
	public void testPostEmployee()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		
		empCon.postEmployeeData(emp);
		
		Mockito.verify(empServ).save(emp);
		
	}
	
	@Test
	public void testsearchByNameNoName()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		
		Employee emp1=new Employee();
		emp1.setEmpId(2);
		emp.setEmpFirstName("Employee1");
		emp.setEmpLastName("LastName1");
		emp.setEmpUser("empUser1");
		emp.setEmpAddress("New CG Road Ahmedabad1");
		
		ArrayList<Employee> list=new ArrayList<Employee>();
		list.add(emp);
		list.add(emp1);
		
		Mockito.when(empServ.findAll()).thenReturn(list);
		
		ArrayList<Employee> recv = (ArrayList<Employee>)empCon.searchByName(null, null);
		assertEquals(2,recv.size());
		
	}
	
	@Test
	public void testSearchByNameFirstName()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		ArrayList<Employee> list=new ArrayList<Employee>();
		list.add(emp);
		
		Mockito.when(empServ.findByEmpFirstName("Employee")).thenReturn(list);
		
		ArrayList<Employee> recv = (ArrayList<Employee>)empCon.searchByName("Employee", null);
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void testSearchByNameLastName()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		ArrayList<Employee> list=new ArrayList<Employee>();
		list.add(emp);
		
		Mockito.when(empServ.findByEmpLastName("LastName")).thenReturn(list);
		
		ArrayList<Employee> recv = (ArrayList<Employee>)empCon.searchByName(null, "LastName");
		assertEquals(1,recv.size());
	}
	
	@Test
	public void testSearchByNameBothNames()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		ArrayList<Employee> list=new ArrayList<Employee>();
		list.add(emp);
		
		Mockito.when(empServ.findByEmpFirstNameAndEmpLastName("Employee", "LastName")).thenReturn(list);
		
		ArrayList<Employee> recv = (ArrayList<Employee>)empCon.searchByName("Employee", "LastName");
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void testSearchByUserName()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		ArrayList<Employee> list=new ArrayList<Employee>();
		list.add(emp);
		
		Mockito.when(empServ.findByEmpUser("empUser")).thenReturn(list);
		
		Employee recv=((ArrayList<Employee>)empCon.searchByUserName("empUser")).get(0);
		
		assertEquals(1,recv.getEmpId());
		assertEquals("Employee",recv.getEmpFirstName());
		assertEquals("LastName",recv.getEmpLastName());
		assertEquals("empUser",recv.getEmpUser());
		assertEquals("New CG Road Ahmedabad",recv.getEmpAddress());
		
	}
	
	@Test
	public void testPutEmployee()
	{
		Employee emp=new Employee();
		emp.setEmpId(1);
		emp.setEmpFirstName("Employee");
		emp.setEmpLastName("LastName");
		emp.setEmpUser("empUser");
		emp.setEmpAddress("New CG Road Ahmedabad");
		
		empCon.updateEmployeeData(emp);
		
		Mockito.verify(empServ).save(emp);
	}
	
}

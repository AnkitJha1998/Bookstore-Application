package com.library.bookstore;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import com.library.bookstore.controller.UserController;
import com.library.bookstore.entity.Credentials;
import com.library.bookstore.entity.User;
import com.library.bookstore.service.UserService;

class UserControllerTest {

	@Mock
	UserService userServ;
	
	@InjectMocks
	UserController userCon;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetAllUsers()
	{
		User user1=new User();
		user1.setUserId(1);
		user1.setUserFirstName("User1");
		user1.setUserLastName("Last");
		user1.setCredUser("user1");
		user1.setCredPass("pass");
		
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user1);
		list.add(user);
		
		Mockito.when(userServ.findAll()).thenReturn(list);
		
		ArrayList<User> recv=(ArrayList<User>) userCon.getAllUsers();
		
		assertEquals(2,recv.size());
		
		
	}
	
	@Test
	public void testPostUserDetails()
	{
		User user1=new User();
		user1.setUserId(1);
		user1.setUserFirstName("User1");
		user1.setUserLastName("Last");
		user1.setCredUser("user1");
		user1.setCredPass("pass");
		
		userCon.postUserDetails(user1);
		
		Mockito.verify(userServ).save(user1);
	}
	
	@Test
	public void testPostUserDetailEmpty()
	{
		User user1=new User();
		user1.setUserId(1);
		user1.setUserFirstName("");
		user1.setUserLastName("");
		user1.setCredUser("");
		user1.setCredPass("pass");
		
		ResponseEntity<String> recv=userCon.postUserDetails(user1);
		
		assertEquals("User Details Empty",recv.getBody());
	}
	
	@Test
	public void testPostUserDetailExisting()
	{
		User user1=new User();
		user1.setUserId(1);
		user1.setUserFirstName("User1");
		user1.setUserLastName("Last");
		user1.setCredUser("user1");
		user1.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user1);
		Mockito.when(userServ.findByCredUser("user1")).thenReturn(list);
		
		ResponseEntity<String> recv=userCon.postUserDetails(user1);
		
		assertEquals("Username Already Exists",recv.getBody());
	}
	
	@Test
	public void testUpdateProfile()
	{
		User user1=new User();
		user1.setUserId(1);
		user1.setUserFirstName("User1");
		user1.setUserLastName("Last");
		user1.setCredUser("user1");
		user1.setCredPass("pass");
		
		userCon.updateProfile(user1);
		
		Mockito.verify(userServ).save(user1);
	}
	
	@Test
	public void testGetUserByNameNoName()
	{
		User user1=new User();
		user1.setUserId(1);
		user1.setUserFirstName("User1");
		user1.setUserLastName("Last");
		user1.setCredUser("user1");
		user1.setCredPass("pass");
		
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user1);
		list.add(user);
		
		Mockito.when(userServ.findAll()).thenReturn(list);
		
		ArrayList<User> recv=(ArrayList<User>) userCon.getUsersByName(null, null);
		
		assertEquals(2,recv.size());
		
	}
	
	@Test
	public void testGetUserByNameFirst()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		Mockito.when(userServ.findByUserFirstName("User2")).thenReturn(list);
		
		ArrayList<User> recv=(ArrayList<User>) userCon.getUsersByName("User2", null);
		
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void testGetUserByNameLast()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		Mockito.when(userServ.findByUserLastName("Last1")).thenReturn(list);
		
		ArrayList<User> recv=(ArrayList<User>) userCon.getUsersByName(null,"Last1");
		
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void testGetUserByNameBoth()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		Mockito.when(userServ.findByUserFirstNameAndUserLastName("User2", "Last1")).thenReturn(list);
		
		ArrayList<User> recv=(ArrayList<User>) userCon.getUsersByName("User2", "Last1");
		
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void testGetUserUserName()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		Mockito.when(userServ.findByCredUser("user2")).thenReturn(list);
		
		ArrayList<User> recv=(ArrayList<User>) userCon.getUserByUserName("user2");
		
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void getUserById()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		Mockito.when(userServ.findById(2)).thenReturn(Optional.of(user));
		
		User recv=(userCon.getUserById(2)).get();
		
		assertEquals(2,recv.getUserId());
		assertEquals("User2",recv.getUserFirstName());
		assertEquals("Last1",recv.getUserLastName());
		assertEquals("user2",recv.getCredUser());
		assertEquals("pass",recv.getCredPass());
	}
	
	@Test
	public void testWorkingOrNot()
	{
		ResponseEntity<String> recv=userCon.test();
		
		assertEquals("<h1>Testing Service</h1>",recv.getBody());
	}
	
	@Test
	public void testAuthenticateUserNotExists()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		
		Credentials cred=new Credentials();
		cred.setUsername("user2");
		cred.setPassword("pass");
		
		Mockito.when(userServ.findByCredUser("user2")).thenReturn(new ArrayList<User>());
		
		ResponseEntity<String> recv=userCon.authenticateUser(cred);
		
		assertEquals("Authentication Failed",recv.getBody());
		
		
	}
	
	@Test
	public void testAuthenticateUserWrongDet()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		
		Credentials cred=new Credentials();
		cred.setUsername("user2");
		cred.setPassword("pass11");
		
		Mockito.when(userServ.findByCredUser("user2")).thenReturn(list);
		
		ResponseEntity<String> recv=userCon.authenticateUser(cred);
		
		assertEquals("Authentication Failed",recv.getBody());
		
		
	}
	
	@Test
	public void testAuthenticateUserRightDet()
	{
		User user=new User();
		user.setUserId(2);
		user.setUserFirstName("User2");
		user.setUserLastName("Last1");
		user.setCredUser("user2");
		user.setCredPass("pass");
		ArrayList<User> list=new ArrayList<User>();
		list.add(user);
		
		Credentials cred=new Credentials();
		cred.setUsername("user2");
		cred.setPassword("pass");
		
		Mockito.when(userServ.findByCredUser("user2")).thenReturn(list);
		
		ResponseEntity<String> recv=userCon.authenticateUser(cred);
		
		assertEquals("User2 Last1",recv.getBody());
		
		
	}
	
}

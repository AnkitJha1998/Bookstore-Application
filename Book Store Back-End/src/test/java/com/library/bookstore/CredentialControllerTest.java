package com.library.bookstore;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.library.bookstore.controller.CredentialController;
import com.library.bookstore.entity.Credentials;
import com.library.bookstore.service.CredentialService;

class CredentialControllerTest {

	@InjectMocks
	CredentialController credCon;
	
	@Mock
	CredentialService credServ;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testPostUsernameExisting() {
		Credentials cred=new Credentials();
		cred.setUsername("username");
		cred.setPassword("password");
		
		Mockito.when(credServ.findById("username")).thenReturn(Optional.of(cred));
		
		ResponseEntity<String> recv=credCon.postUsername(cred);
		
		assertEquals(HttpStatus.CONFLICT, recv.getStatusCode());
		
	}
	
	@Test
	public void testPostUsernameNew() {
		Credentials cred=new Credentials();
		cred.setUsername("username");
		cred.setPassword("password");
		
		Mockito.when(credServ.findById("username")).thenReturn(Optional.empty());
		
		ResponseEntity<String> recv=credCon.postUsername(cred);
		
		assertEquals(HttpStatus.CREATED, recv.getStatusCode());
		
	}
	
	@Test
	public void testAuthenticateNoUser()
	{
		Credentials cred=new Credentials();
		cred.setUsername("username");
		cred.setPassword("password");
		Mockito.when(credServ.findById("username")).thenReturn(Optional.empty());
		
		ResponseEntity<String> recv=credCon.authenticateUser(cred);
		
		assertEquals(HttpStatus.UNAUTHORIZED, recv.getStatusCode());
	}
	
	@Test
	public void testAuthenticateWrongUser()
	{
		Credentials cred=new Credentials();
		cred.setUsername("user1");
		cred.setPassword("pass");
		Mockito.when(credServ.findById("user1")).thenReturn(Optional.of(cred));
		
		Credentials cred1=new Credentials();
		cred1.setUsername("user1");
		cred1.setPassword("pass1");
		
		ResponseEntity<String> recv=credCon.authenticateUser(cred1);
		
		assertEquals("Authentication Failed",recv.getBody());
		
	}
	
	@Test
	public void testAuthenticateUserRight()
	{
		Credentials cred=new Credentials();
		cred.setUsername("user1");
		cred.setPassword("pass");
		Mockito.when(credServ.findById("user1")).thenReturn(Optional.of(cred));
		
		Credentials cred1=new Credentials();
		cred1.setUsername("user1");
		cred1.setPassword("pass");
		
		ResponseEntity<String> recv=credCon.authenticateUser(cred1);
		
		assertEquals("Authentication Successful",recv.getBody());
	}

}

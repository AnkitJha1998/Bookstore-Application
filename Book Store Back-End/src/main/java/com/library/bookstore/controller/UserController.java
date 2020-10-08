package com.library.bookstore.controller;

import java.util.ArrayList;
import java.util.Optional;

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

import com.library.bookstore.entity.Credentials;
import com.library.bookstore.entity.User;
import com.library.bookstore.service.UserService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

	@Autowired
	private UserService userServ;
	
	@GetMapping("/users")
	public Iterable<User> getAllUsers()
	{
		return userServ.findAll();
	}
	@PostMapping("/users")
	public ResponseEntity<String> postUserDetails(@RequestBody User userDet){
		if(userDet.getCredUser().equals("") || userDet.getUserFirstName().equals("") || userDet.getUserLastName().equals("") )
			return new ResponseEntity<String>("User Details Empty",HttpStatus.NO_CONTENT);
		//204
		
		Iterable<User> user=userServ.findByCredUser(userDet.getCredUser());
		ArrayList<User> list=(ArrayList<User>)user;
		if(list.size()>0)
				return new ResponseEntity<String>("Username Already Exists", HttpStatus.IM_USED);
		//226
		
		userServ.save(userDet);
		return new ResponseEntity<String>("Data Saved", HttpStatus.CREATED);
		//201
	}
	
	@GetMapping("/user/name")
	public Iterable<User> getUsersByName(@RequestParam("FirstName")String firstName, @RequestParam("LastName")String lastName)
	{
		if(firstName==null && lastName==null)
			return userServ.findAll();
		else if(lastName==null)
			return userServ.findByUserFirstName(firstName);
		else if(firstName==null)
			return userServ.findByUserLastName(lastName);
		else
			return userServ.findByUserFirstNameAndUserLastName(firstName, lastName);
	}
	
	@GetMapping("/user/username")
	public Iterable<User> getUserByUserName(@RequestParam("Username")String user)
	{
		return userServ.findByCredUser(user);
	}
	
	@GetMapping("/user/{id}")
	public Optional<User> getUserById(@PathVariable int id){
		return userServ.findById(id);
	}
	
	@GetMapping("/")
	public ResponseEntity<String> test()
	{
		return new ResponseEntity<String>("<h1>Testing Service</h1>",HttpStatus.OK);
	}
	
	@PutMapping("/users")
	public ResponseEntity<String> updateProfile(@RequestBody User user)
	{
		userServ.save(user);
		return new ResponseEntity<String>("Update done successfully",HttpStatus.ACCEPTED);
		//202
	}
	/*@DeleteMapping("/users/{id}")
	public String deleteUsers(@PathVariable int id)
	{
		userServ.deleteById(id);
		return "Deleted User Data";
	}*/
	
	@PostMapping("/user/authenticate")
	public ResponseEntity<String> authenticateUser(@RequestBody Credentials cred)
	{
		ArrayList<User> exist=(ArrayList<User>)userServ.findByCredUser(cred.getUsername());
		if(exist.size()==0)
			return new ResponseEntity<String>("Authentication Failed",HttpStatus.UNAUTHORIZED);
		if(exist.get(0).getCredPass().equals(cred.getPassword()))
			return new ResponseEntity<String>(exist.get(0).getUserFirstName()+" "+exist.get(0).getUserLastName(),HttpStatus.ACCEPTED);
		//202
		else
			return new ResponseEntity<String>("Authentication Failed",HttpStatus.UNAUTHORIZED);
		//401
	}
	
	
}

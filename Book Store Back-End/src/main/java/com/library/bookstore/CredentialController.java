package com.library.bookstore;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin (origins = "*" , allowedHeaders = "*")
@RestController
public class CredentialController {

	@Autowired
	private CredentialService serv;
	
	@PostMapping("/username/add")
	public ResponseEntity<String> postUsername(@RequestBody Credentials cred)
	{
		Optional<Credentials> check=serv.findById(cred.getUsername());
		
		if(check.isPresent())
			return new ResponseEntity<String>("Username Already Exists ",HttpStatus.CONFLICT);
		//409
		else {
			serv.save(cred);
			return new ResponseEntity<String>("Username,Password Added",HttpStatus.CREATED);
			//201
		}
	}
	
	@PostMapping("/credential")
	public ResponseEntity<String> authenticateUser(@RequestBody Credentials cred)
	{
		Optional<Credentials> check=serv.findById(cred.getUsername());
		if(check.isEmpty())
		{
			return new ResponseEntity<String>("Account Does Not Exist",HttpStatus.UNAUTHORIZED);
		}
		else
		{
			if(check.get().getPassword().equals(cred.getPassword()))
				return new ResponseEntity<String>("Authentication Successful",HttpStatus.ACCEPTED);
			//202
			else
				return new ResponseEntity<String>("Authentication Failed",HttpStatus.UNAUTHORIZED);
			//401
		}
	}
	
	
	
}

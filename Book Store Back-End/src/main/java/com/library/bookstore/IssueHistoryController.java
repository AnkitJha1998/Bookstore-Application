package com.library.bookstore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class IssueHistoryController {
	
	
	@Autowired
	private IssueHistoryService serv;
	
	@GetMapping("/issue")
	public Iterable<IssueHistory> getAllIssue()
	{
		return serv.findAll();
	}
	
	@PostMapping("/issue")
	public ResponseEntity<String> postIssueData(@RequestBody IssueHistory issue)
	{
		serv.save(issue);
		return new ResponseEntity<String>("Issue Details Saved Successfully",HttpStatus.CREATED);
		//201
	}
	
	@PutMapping("/issue")
	public ResponseEntity<String> updateIssueDetails(@RequestBody IssueHistory issue)
	{
		serv.save(issue);
		return new ResponseEntity<String>("Issue Updated Successfully",HttpStatus.OK);
	}
	
	
	
	
	
}

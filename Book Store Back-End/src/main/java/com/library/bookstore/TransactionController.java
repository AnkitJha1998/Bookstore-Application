package com.library.bookstore;

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
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class TransactionController {
	
	@Autowired
	private TransactionService tServ;
	
	@GetMapping("/trans")
	public Iterable<Transaction> getTransaction()
	{
		return tServ.findAll();
	}
	
	@PostMapping("/trans")
	public ResponseEntity<String> postTransaction(@RequestBody Transaction trans)
	{
		tServ.save(trans);
		return new ResponseEntity<String>("Transaction Saved", HttpStatus.CREATED);
	}
	 
	@GetMapping("/trans/{id}")
	public Optional<Transaction> getTransactionById(@PathVariable int id)
	{
		return tServ.findById(id);
	}
	
	@GetMapping("/trans/userId/{id}")
	public Iterable<Transaction> getTransactionByUserId(@PathVariable("id") int userId)
	{
		return tServ.findByUserId(userId);
	}
	
	@GetMapping("/trans/bookId/{id}")
	public Iterable<Transaction> getTransactionByBookId(@PathVariable("id") int bookId)
	{
		return tServ.findByBookId(bookId);
	}
	
	@PutMapping("/trans")
	public ResponseEntity<String> putTransaction(@RequestBody Transaction trans)
	{
		tServ.save(trans);
		return new ResponseEntity<String>("Transaction Updated",HttpStatus.ACCEPTED);
		//202
	}
	

}

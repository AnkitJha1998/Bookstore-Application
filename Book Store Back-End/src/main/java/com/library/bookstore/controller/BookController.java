package com.library.bookstore.controller;

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

import com.library.bookstore.BookCategory;
import com.library.bookstore.entity.Book;
import com.library.bookstore.service.BookService;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class BookController {

	@Autowired
	private BookService serv;
	
	@GetMapping("/books")
	public Iterable<Book> getBooks()
	{
		return serv.findAll();
	}
	
	@PostMapping("/books")
	public ResponseEntity<String> postBookDetails(@RequestBody Book book)
	{
		serv.save(book);
		return new ResponseEntity<String>("Book Saved", HttpStatus.CREATED);
	}
	
	@GetMapping("/books/{id}")
	public Optional<Book> getBookById(@PathVariable int id)
	{
		return serv.findById(id);
		
	}
	
	@GetMapping("/books/category")
	public Iterable<Book> getBookByCategory(@RequestParam("category")BookCategory category)
	{
		return serv.findByBookCategory(category);
	}
	
	@GetMapping("/books/author")
	public Iterable<Book> getBookByAuthorName(@RequestParam(value = "fName", required=false)String fName, @RequestParam(value = "lName", required= false )String lName)
	{
		if(fName!=null && lName!=null)
			return serv.findByAuthorFirstNameAndAuthorLastName(fName, lName);
		else if(lName==null && fName!=null)
			return serv.findByAuthorFirstName(fName);
		else if(fName==null&&lName!=null)
			return serv.findByAuthorLastName(lName);
		else
			return serv.findAll();
	}
	
	@PutMapping("books")
	public ResponseEntity<String> saveBookDetails(@RequestBody Book books)
	{
		serv.save(books);
		return new ResponseEntity<String>("Book Details Updated", HttpStatus.ACCEPTED);
		
		//202
	}
	
}

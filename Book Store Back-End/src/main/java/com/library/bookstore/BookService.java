package com.library.bookstore;

import org.springframework.data.repository.CrudRepository;

public interface BookService extends CrudRepository<Book,Integer>{

	public Iterable<Book> findByBookCategory(BookCategory BookCategory); 
	public Iterable<Book> findByAuthorFirstNameAndAuthorLastName(String fName,String lName);
	public Iterable<Book> findByAuthorFirstName(String fName);
	public Iterable<Book> findByAuthorLastName(String lName);
	
	
}

package com.library.bookstore;

import org.springframework.data.repository.CrudRepository;

public interface TransactionService extends CrudRepository<Transaction, Integer>{

	
	public Iterable<Transaction> findByUserId(int userId);
	public Iterable<Transaction> findByBookId(int empId);
	
}

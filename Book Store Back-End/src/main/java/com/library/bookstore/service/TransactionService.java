package com.library.bookstore.service;

import org.springframework.data.repository.CrudRepository;

import com.library.bookstore.entity.Transaction;

public interface TransactionService extends CrudRepository<Transaction, Integer>{

	
	public Iterable<Transaction> findByUserId(int userId);
	public Iterable<Transaction> findByBookId(int empId);
	
}

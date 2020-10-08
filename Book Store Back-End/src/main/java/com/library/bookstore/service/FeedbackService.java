package com.library.bookstore.service;

import org.springframework.data.repository.CrudRepository;

import com.library.bookstore.entity.Feedback;

public interface FeedbackService extends CrudRepository<Feedback, Integer>{
	
	public Iterable<Feedback> findByBookId(int bookId);

}

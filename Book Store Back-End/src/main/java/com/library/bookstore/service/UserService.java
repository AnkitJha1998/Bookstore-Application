package com.library.bookstore.service;

import org.springframework.data.repository.CrudRepository;

import com.library.bookstore.entity.User;


public interface UserService extends CrudRepository<User, Integer>{

	
	public Iterable<User> findByUserFirstNameAndUserLastName(String firstName,String lastName);
	public Iterable<User> findByUserFirstName(String firstName);
	public Iterable<User> findByUserLastName(String lastName);
	public Iterable<User> findByCredUser(String Cred);
	
	
}

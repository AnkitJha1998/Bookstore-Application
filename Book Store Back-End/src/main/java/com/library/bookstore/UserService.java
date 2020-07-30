package com.library.bookstore;

import org.springframework.data.repository.CrudRepository;


public interface UserService extends CrudRepository<User, Integer>{

	
	public Iterable<User> findByUserFirstNameAndUserLastName(String firstName,String lastName);
	public Iterable<User> findByUserFirstName(String firstName);
	public Iterable<User> findByUserLastName(String lastName);
	public Iterable<User> findByCredUser(String Cred);
	
	
}

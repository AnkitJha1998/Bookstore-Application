package com.library.bookstore.service;

import org.springframework.data.repository.CrudRepository;

import com.library.bookstore.entity.Credentials;


public interface CredentialService extends CrudRepository<Credentials, String>{

}

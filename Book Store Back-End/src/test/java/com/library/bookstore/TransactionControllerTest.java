package com.library.bookstore;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.library.bookstore.controller.TransactionController;
import com.library.bookstore.entity.Transaction;
import com.library.bookstore.service.TransactionService;

class TransactionControllerTest {

	@Mock
	TransactionService tranServ;
	
	@InjectMocks
	TransactionController tranCon;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetTransactions()
	{
		Transaction trans=new Transaction();
		trans.setTransId(1);
		trans.setAccepted(false);
		trans.setAddress("Chandkheda, Ahmedabad");
		trans.setBookId(2);
		trans.setPaytmId("142415787");
		trans.setUserId(2);
		trans.setEmpId(1);
		Transaction trans1=new Transaction();
		trans1.setTransId(2);
		trans1.setAccepted(false);
		trans1.setAddress("Motera, Ahmedabad");
		trans1.setBookId(1);
		trans1.setPaytmId("142415782");
		trans1.setUserId(5);
		trans1.setEmpId(1);
		
		ArrayList<Transaction> list=new ArrayList<Transaction>();
		list.add(trans);
		list.add(trans1);
		
		Mockito.when(tranServ.findAll()).thenReturn(list);
		
		ArrayList<Transaction> recv=(ArrayList<Transaction>)tranCon.getTransaction();
		
		assertEquals(2, recv.size());
		
	}
	
	@Test
	public void testPostTransaction()
	{
		Transaction trans=new Transaction();
		trans.setTransId(1);
		trans.setAccepted(false);
		trans.setAddress("Chandkheda, Ahmedabad");
		trans.setBookId(2);
		trans.setPaytmId("142415787");
		trans.setUserId(2);
		trans.setEmpId(1);
		
		tranCon.postTransaction(trans);
		
		Mockito.verify(tranServ).save(trans);
	}
	
	@Test
	public void testgetTransactionById()
	{
		Transaction trans=new Transaction();
		trans.setTransId(1);
		trans.setAccepted(false);
		trans.setAddress("Chandkheda, Ahmedabad");
		trans.setBookId(2);
		trans.setPaytmId("142415787");
		trans.setUserId(2);
		trans.setEmpId(1);
		
		Mockito.when(tranServ.findById(1)).thenReturn(Optional.of(trans));
		
		Transaction trans1=(tranCon.getTransactionById(1)).get();
		
		assertEquals(trans1.getUserId(),2);
		assertEquals(trans1.getTransId(),1);
		assertEquals(trans1.getPaytmId(),"142415787");
		assertEquals(trans1.isAccepted(),false);
		assertEquals(trans1.getAddress(),"Chandkheda, Ahmedabad");
		assertEquals(trans1.getBookId(),2);
		assertEquals(trans1.getEmpId(),1);
	}
	
	@Test
	public void testgetTransactionByBookId()
	{
		Transaction trans=new Transaction();
		trans.setTransId(1);
		trans.setAccepted(false);
		trans.setAddress("Chandkheda, Ahmedabad");
		trans.setBookId(2);
		trans.setPaytmId("142415787");
		trans.setUserId(2);
		trans.setEmpId(1);
		ArrayList<Transaction> list=new ArrayList<Transaction>();
		list.add(trans);
		Mockito.when(tranServ.findByBookId(2)).thenReturn(list);
		
		ArrayList<Transaction> recv=(ArrayList<Transaction>)tranCon.getTransactionByBookId(2);
		assertEquals(recv.size(),1);
	}
	
	@Test
	public void testgetTransactionByUserId()
	{
		Transaction trans=new Transaction();
		trans.setTransId(1);
		trans.setAccepted(false);
		trans.setAddress("Chandkheda, Ahmedabad");
		trans.setBookId(2);
		trans.setPaytmId("142415787");
		trans.setUserId(2);
		trans.setEmpId(1);
		ArrayList<Transaction> list=new ArrayList<Transaction>();
		list.add(trans);
		Mockito.when(tranServ.findByUserId(2)).thenReturn(list);
		
		ArrayList<Transaction> recv=(ArrayList<Transaction>)tranCon.getTransactionByUserId(2);
		assertEquals(recv.size(),1);
	}
	
	@Test
	public void tesPutTransaction()
	{
		Transaction trans=new Transaction();
		trans.setTransId(1);
		trans.setAccepted(false);
		trans.setAddress("Chandkheda, Ahmedabad");
		trans.setBookId(2);
		trans.setPaytmId("142415787");
		trans.setUserId(2);
		trans.setEmpId(1);
		
		tranCon.putTransaction(trans);
		Mockito.verify(tranServ).save(trans);
	}
	
}

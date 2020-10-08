package com.library.bookstore;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.library.bookstore.controller.FeedbackController;
import com.library.bookstore.entity.Feedback;
import com.library.bookstore.service.FeedbackService;

class FeedbackControllerTest {

	@Mock
	FeedbackService feedServ;
	
	@InjectMocks
	FeedbackController feedCon;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetAllFeedback()
	{
		Feedback feedback=new Feedback();
		feedback.setFeedbackId(1);
		feedback.setBookId(1);
		feedback.setFeedback("Good");
		feedback.setStar(3);
		feedback.setUserId(4);
		ArrayList<Feedback> list=new ArrayList<Feedback>();
		list.add(feedback);
		Feedback feedback1=new Feedback();
		feedback1.setFeedbackId(2);
		feedback1.setBookId(2);
		feedback1.setFeedback("Good");
		feedback1.setStar(3);
		feedback1.setUserId(4);
		list.add(feedback1);
		
		Mockito.when(feedServ.findAll()).thenReturn(list);
		
		ArrayList<Feedback> recv=(ArrayList<Feedback>)feedCon.getFeedback();
		
		assertEquals(2,recv.size());
		
		
	}
	
	@Test
	public void testSaveFeedback()
	{
		Feedback feedback=new Feedback();
		feedback.setFeedbackId(1);
		feedback.setBookId(1);
		feedback.setFeedback("Good");
		feedback.setStar(3);
		feedback.setUserId(4);
		
		feedCon.postFeedback(feedback);
		
		Mockito.verify(feedServ).save(feedback);
	}
	
	@Test
	public void testFeedBackId()
	{
		Feedback feedback=new Feedback();
		feedback.setFeedbackId(1);
		feedback.setBookId(1);
		feedback.setFeedback("Good");
		feedback.setStar(3);
		feedback.setUserId(4);
		ArrayList<Feedback> list=new ArrayList<Feedback>();
		list.add(feedback);
		Mockito.when(feedServ.findByBookId(1)).thenReturn(list);
		
		ArrayList<Feedback> recv=(ArrayList<Feedback>)feedCon.getBookFeedback(1);
		
		assertEquals(1,recv.get(0).getFeedbackId());
		assertEquals(1,recv.get(0).getBookId());
		assertEquals("Good",recv.get(0).getFeedback());
		assertEquals(3,recv.get(0).getStar());
		assertEquals(4,recv.get(0).getUserId());
		
	}
}

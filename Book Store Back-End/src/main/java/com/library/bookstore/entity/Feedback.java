package com.library.bookstore.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Feedback {
	
	@Id
	@GeneratedValue( strategy=GenerationType.AUTO , generator = "feedback_gen")
	@SequenceGenerator(name = "feedback_gen", sequenceName = "feedback_gen" , initialValue = 1, allocationSize = 1 )
	private int feedbackId;
	private int userId;
	private int bookId;
	private int star;
	private String feedback;
	public int getFeedbackId() {
		return feedbackId;
	}
	public void setFeedbackId(int feedbackId) {
		this.feedbackId = feedbackId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public String getFeedback() {
		return feedback;
	}
	public void setFeedback(String feedback) {
		this.feedback = feedback;
	}

	
}

package com.library.bookstore;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class IssueHistory {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "issue_gen")
	@SequenceGenerator(name = "issue_gen", sequenceName = "issue_gen", allocationSize = 1, initialValue = 1)
	private int issueId;
	
	private int bookId;
	private int userId;
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate issueDate;
	
	@JsonFormat(pattern = "dd-MM-yyyy")
	private LocalDate returnDate;

	public int getIssueId() {
		return issueId;
	}

	public void setIssueId(int issueId) {
		this.issueId = issueId;
	}

	public int getBookId() {
		return bookId;
	}

	public void setBookId(int bookId) {
		this.bookId = bookId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public LocalDate getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(LocalDate issueDate) {
		this.issueDate = issueDate;
	}

	public LocalDate getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDate returnDate) {
		this.returnDate = returnDate;
	}
	
	
	
}

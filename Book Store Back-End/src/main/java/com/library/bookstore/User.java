package com.library.bookstore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class User {

	@Id
	@GeneratedValue (strategy = GenerationType.AUTO, generator = "user_gen")	
	@SequenceGenerator (name = "user_gen", sequenceName = "user_gen", allocationSize = 1, initialValue = 1)
	private int userId;
	private String userFirstName;
	private String userLastName;
	private String credUser;
	private String credPass;
	private int penalty;
	private int bookIssue;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	
	public String getUserFirstName() {
		return userFirstName;
	}
	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}
	public String getUserLastName() {
		return userLastName;
	}
	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}
	public String getCredUser() {
		return credUser;
	}
	public void setCredUser(String credUser) {
		this.credUser = credUser;
	}
	public int getPenalty() {
		return penalty;
	}
	public void setPenalty(int penalty) {
		this.penalty = penalty;
	}
	public int getBookIssue() {
		return bookIssue;
	}
	public void setBookIssue(int bookIssue) {
		this.bookIssue = bookIssue;
	}
	public String getCredPass() {
		return credPass;
	}
	public void setCredPass(String credPass) {
		this.credPass = credPass;
	}
	
	
}

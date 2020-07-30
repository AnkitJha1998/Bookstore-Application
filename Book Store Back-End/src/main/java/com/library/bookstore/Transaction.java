package com.library.bookstore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

@Entity
public class Transaction {
	
	@Id
	@GeneratedValue (strategy = GenerationType.AUTO , generator = "trans_seq" )
	@SequenceGenerator(name = "trans_seq" , sequenceName = "trans_seq", allocationSize = 1, initialValue = 1)
	private int transId;
	private int userId;
	private int bookId;
	private int empId;
	private String address;
	private String paytmId;
	private boolean accepted;
	public int getTransId() {
		return transId;
	}
	public void setTransId(int transId) {
		this.transId = transId;
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
	public int getEmpId() {
		return empId;
	}
	public void setEmpId(int empId) {
		this.empId = empId;
	}
	public String getPaytmId() {
		return paytmId;
	}
	public void setPaytmId(String paytmId) {
		this.paytmId = paytmId;
	}
	
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public boolean isAccepted() {
		return accepted;
	}
	public void setAccepted(boolean accepted) {
		this.accepted = accepted;
	}
	
	
	
	
}

package com.library.bookstore.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import com.library.bookstore.BookCategory;

@Entity
public class Book {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "book_gen")
	@SequenceGenerator(name = "book_gen", sequenceName = "book_gen", initialValue = 1, allocationSize = 1 )
	private int bookId;
	
	private String bookName;
	
	@Enumerated(EnumType.STRING)
	private BookCategory bookCategory;
	private String authorFirstName;
	private String authorLastName;
	private int price;
	private float avgRating;
	private double ratingCount;
	private String bookDesc;
	
	public int getBookId() {
		return bookId;
	}
	public void setBookId(int bookId) {
		this.bookId = bookId;
	}
	
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	
	public String getAuthorFirstName() {
		return authorFirstName;
	}
	public void setAuthorFirstName(String authorFirstName) {
		this.authorFirstName = authorFirstName;
	}
	
	public String getAuthorLastName() {
		return authorLastName;
	} 
	public void setAuthorLastName(String authorLastName) {
		this.authorLastName = authorLastName;
	}
	
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	
	public BookCategory getBookCategory() {
		return bookCategory;
	}
	public void setBookCategory(BookCategory bookCategory) {
		this.bookCategory = bookCategory;
	}
	
	public float getAvgRating() {
		return avgRating;
	}
	public void setAvgRating(float avgRating) {
		this.avgRating = avgRating;
	}
	
	public double getRatingCount() {
		return ratingCount;
	}
	public void setRatingCount(double ratingCount) {
		this.ratingCount = ratingCount;
	}
	
	public String getBookDesc() {
		return bookDesc;
	}
	public void setBookDesc(String bookDesc) {
		this.bookDesc = bookDesc;
	}
	
}

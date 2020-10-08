package com.library.bookstore;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.library.bookstore.controller.BookController;
import com.library.bookstore.entity.Book;
import com.library.bookstore.service.BookService;

class BookControllerTest {

	@InjectMocks
	BookController bookCon;
	
	@Mock
	BookService bookServ;
	
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.initMocks(this);
	}
	
	@Test
	public void testGetAllData() {
		
		ArrayList<Book> list = new ArrayList<Book>();
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		list.add(book);
		book.setBookId(2);
		book.setBookName("The Invisible Man");
		book.setAuthorFirstName("HG");
		book.setAuthorLastName("Wells");
		book.setBookCategory(BookCategory.SOCIAL_COMMENTARY);
		book.setPrice(399);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		list.add(book);
		
		Mockito.when(bookServ.findAll()).thenReturn(list);
		
		Iterable<Book> bookList = bookCon.getBooks();
		ArrayList<Book> listOfBooks = (ArrayList<Book>)bookList;
		assertEquals(2,listOfBooks.size());
	}
	
	@Test
	public void testPostBookDetails()
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		
		bookCon.postBookDetails(book);
		
		Mockito.verify(bookServ).save(book);
	}
	
	@Test
	public void testGetBookById()
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		
		Mockito.when(bookServ.findById(1)).thenReturn(Optional.of(book));
		
		Book recv = bookCon.getBookById(1).get();
		
		assertEquals(1,recv.getBookId());
		assertEquals("The Last Mile",recv.getBookName());
		assertEquals("David",recv.getAuthorFirstName());
		assertEquals("Baldacci",recv.getAuthorLastName());
		assertEquals(BookCategory.CRIME_DETECTIVE,recv.getBookCategory());
		assertEquals(599,recv.getPrice());
		assertEquals(0,recv.getRatingCount());
		assertEquals(0, recv.getAvgRating());
		assertEquals("Demo Book Desc", recv.getBookDesc());
		
	}
	
	@Test
	public void testGetBookByCategory()
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		ArrayList<Book> list=new ArrayList<Book>();
		
		list.add(book);
		
		Mockito.when(bookServ.findByBookCategory(BookCategory.CRIME_DETECTIVE)).thenReturn(list);
		
		ArrayList<Book> recv=(ArrayList<Book>) bookCon.getBookByCategory(BookCategory.CRIME_DETECTIVE);
		
		assertEquals(1,recv.size());
		
	}
	
	@Test
	public void testGetBookByAuthorNoNames()
	{
		ArrayList<Book> list = new ArrayList<Book>();
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		list.add(book);
		book.setBookId(2);
		book.setBookName("The Invisible Man");
		book.setAuthorFirstName("HG");
		book.setAuthorLastName("Wells");
		book.setBookCategory(BookCategory.SOCIAL_COMMENTARY);
		book.setPrice(399);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		list.add(book);
		
		Mockito.when(bookServ.findAll()).thenReturn(list);
		
		ArrayList<Book> recv=(ArrayList<Book>) bookCon.getBookByAuthorName(null, null);
		
		assertEquals(2,recv.size());
		
	}
	
	@Test
	public void testGetBooksByAuthorFirstName()
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		ArrayList<Book> list=new ArrayList<Book>();
		list.add(book);
		Mockito.when(bookServ.findByAuthorFirstName("David")).thenReturn(list);
		
		ArrayList<Book> recv=(ArrayList<Book>) bookCon.getBookByAuthorName("David", null);
		
		assertEquals(1,recv.get(0).getBookId());
	}
	
	@Test
	public void testGetBooksByAuthorLastName()
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		ArrayList<Book> list=new ArrayList<Book>();
		list.add(book);
		Mockito.when(bookServ.findByAuthorLastName("Baldacci")).thenReturn(list);
		
		ArrayList<Book> recv=(ArrayList<Book>) bookCon.getBookByAuthorName(null, "Baldacci");
		assertEquals(1,recv.get(0).getBookId());
		
	}
	
	@Test
	public void testGetBooksByAuthorFirstAndLastName()
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		ArrayList<Book> list=new ArrayList<Book>();
		list.add(book);
		Mockito.when(bookServ.findByAuthorFirstNameAndAuthorLastName("David", "Baldacci")).thenReturn(list);
		
		ArrayList<Book> recv=(ArrayList<Book>) bookCon.getBookByAuthorName("David", "Baldacci");
		assertEquals(1,recv.get(0).getBookId());
	}
	
	@Test
	public void testSaveUserDetails() 
	{
		Book book=new Book();
		book.setBookId(1);
		book.setBookName("The Last Mile");
		book.setAuthorFirstName("David");
		book.setAuthorLastName("Baldacci");
		book.setBookCategory(BookCategory.CRIME_DETECTIVE);
		book.setPrice(599);
		book.setAvgRating(0);
		book.setRatingCount(0);
		book.setBookDesc("Demo Book Desc");
		
		bookCon.saveBookDetails(book);
		
		Mockito.verify(bookServ).save(book);
	}
	
}

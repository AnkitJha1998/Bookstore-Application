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
		list.add(book);
		book.setBookId(2);
		book.setBookName("The Invisible Man");
		book.setAuthorFirstName("HG");
		book.setAuthorLastName("Wells");
		book.setBookCategory(BookCategory.SOCIAL_COMMENTARY);
		book.setPrice(399);
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
		
		Mockito.when(bookServ.findById(1)).thenReturn(Optional.of(book));
		
		Book recv = bookCon.getBookById(1).get();
		
		assertEquals(1,recv.getBookId());
		assertEquals("The Last Mile",recv.getBookName());
		assertEquals("David",recv.getAuthorFirstName());
		assertEquals("Baldacci",recv.getAuthorLastName());
		assertEquals(BookCategory.CRIME_DETECTIVE,recv.getBookCategory());
		assertEquals(599,recv.getPrice());
		
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
		ArrayList<Book> list=new ArrayList<Book>();
		
		list.add(book);
		
		Mockito.when(bookServ.findByBookCategory(BookCategory.CRIME_DETECTIVE)).thenReturn(list);
		
		ArrayList<Book> recv=(ArrayList<Book>) bookCon.getBookByCategory(BookCategory.CRIME_DETECTIVE);
		
		assertEquals(1,recv.size());
		
	}
	
}

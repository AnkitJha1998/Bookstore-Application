# Bookstore Application
 This application represents a book store's website. It has all the necessary features required to surf through books and order books on the website. The code comprises of HTML,CSS and Javascript based Front-End and a powerful Springboot-Based Backend. To get Started with the application, we need to click on Home.html in HTML folder to open up Client Side UI.For Opening up the admin or employee login portal, we need to use the EmployeeLogin.html Feature. There are 3 roles in this application. User, Employee and Admin. Let's Start with Client User here.
 
 
## Version v02
Here we have come up with new version of Bookstore Application. Here, now you can see list of books in an all-new Design.


These are list of Books under an author.
![AuthorBookView](https://user-images.githubusercontent.com/37044020/95497023-5090c300-09bf-11eb-8262-5f3f79df8df3.png)

General Searches
![BookLit](https://user-images.githubusercontent.com/37044020/95497095-6e5e2800-09bf-11eb-8083-5a63b230c951.png)

Category Wise Search
![CategorySearch](https://user-images.githubusercontent.com/37044020/95497107-74540900-09bf-11eb-85da-506b7911a62f.png)


The author List is now color coded
![AuthorList](https://user-images.githubusercontent.com/37044020/95497446-f5ab9b80-09bf-11eb-93db-1fa1740308fc.png)

Book Details
![BookDet](https://user-images.githubusercontent.com/37044020/95497540-1b38a500-09c0-11eb-8e01-dba237f71340.png)
![BookFeedback](https://user-images.githubusercontent.com/37044020/95497617-3efbeb00-09c0-11eb-85e0-4de174f28946.png)

When We order book via Buy Book Button in Book Details Page
![OrderDirect](https://user-images.githubusercontent.com/37044020/95497702-6783e500-09c0-11eb-991d-a515a0582d5f.png)

After Ordering, There is a feedback page.
![Feedback](https://user-images.githubusercontent.com/37044020/95497914-b3368e80-09c0-11eb-8ed2-adb8a229210b.png)

On the back end, The software is now thoroughly tested. Here is the test proof
![Coverage](https://user-images.githubusercontent.com/37044020/95499369-cfd3c600-09c2-11eb-829f-3687cc14c4fd.png)

-------------------------------------------------------------------------------------------------------------------------------------------


## Client User

This is the most important part of the application. This is a bookstore application, which allows users to search for books they like and also to search for Authors. Tthey Can them Order the books they like and then after the Employee accepts the order, the order is accepted and then is on the way to delivery. This is the home page. 


![Home](https://user-images.githubusercontent.com/37044020/88918931-f0c3c080-d287-11ea-96a9-a1d99ebaea7d.png)



This is the main Page of this application. There are various tabs and search bar at the top. Footer is also attached, which is not visible, indicating the user to connect on social platforms.
![Footer](https://user-images.githubusercontent.com/37044020/88921738-a55fe100-d28c-11ea-8137-38aa65526364.png)


Now for Ordering the books, we need to have an account on the website. So There's a sign Up Option Available. That leads to this window.
![Sign Up](https://user-images.githubusercontent.com/37044020/88918955-f6b9a180-d287-11ea-989f-560c06e5f51e.png)


After Sign Up is complete, We need to Log In
![Login](https://user-images.githubusercontent.com/37044020/88918939-f3261a80-d287-11ea-9adc-8120ee641c82.png)



After Login, Home Page Looks Like this
![HomeWithUser](https://user-images.githubusercontent.com/37044020/88918935-f1f4ed80-d287-11ea-9df9-3c951b3f35cf.png)




Now to Search for Books From Search Bar at the Top, Here we go
![SearchTitle](https://user-images.githubusercontent.com/37044020/88918954-f6b9a180-d287-11ea-9412-1e4b326d52cf.png)



That when searched, leads to this Search Result.
![SearchResult](https://user-images.githubusercontent.com/37044020/88918951-f6210b00-d287-11ea-8997-c147bcb46527.png)



Now that Search Result is obtained, we can now search for Book at any time. But Sometimes, we need to search by Autho Name. 
![AuthorList](https://user-images.githubusercontent.com/37044020/88918962-f91bfb80-d287-11ea-99e8-91b1ac991555.png)

Now on clicking on any one, it will open up books written by that author.
![AuthorBook](https://user-images.githubusercontent.com/37044020/88918961-f8836500-d287-11ea-8e25-569bac4c5e44.png)


Sometimes we need to search for a particular genre of book. For that, We have the Book By Category Feature.
![Category](https://user-images.githubusercontent.com/37044020/88918969-f9b49200-d287-11ea-81da-dec97a3c04ad.png)

Now, we need to place an order. This Tab lets us do exactly that.
![Order](https://user-images.githubusercontent.com/37044020/88918945-f4efde00-d287-11ea-8931-fdcaa7161cf7.png)

Now that the order is placed, We need to check in our list of Orders. That is possible by checking out our profile. Profile displays the username and allows changing of passwords. Below that, we can also see our List of Orders.
![Profile](https://user-images.githubusercontent.com/37044020/88918950-f5887480-d287-11ea-9ae9-23808b7dced4.png)

In case a user needs to contact us, we have a seperate tabs for contacting. Currently, contact details are only mentioned of the developer. It can be edited.
![Contact](https://user-images.githubusercontent.com/37044020/88918926-eef9fd00-d287-11ea-90b7-6f3837e363ff.png)




## Employee

This role is for the employees of this bookstore. The orders are done through Paytm. So it is crucial for a role to verify those payments. This is done by Employee. Employees can Sign Up here in this application. 

![EmployeeSignUp](https://user-images.githubusercontent.com/37044020/88919824-654b2f00-d289-11ea-8523-006b0042a731.png)

After Sign Up, they need to Login

![Login](https://user-images.githubusercontent.com/37044020/88919789-5cf2f400-d289-11ea-981d-78724c3bfb17.png)

After Login, They gain Access to Employee Portal. There They See the Order List. 

![Order List](https://user-images.githubusercontent.com/37044020/88919820-64b29880-d289-11ea-8350-c81c72c798ac.png)

After Employee Cross Verifies the Order, he/she clicks the button. This Disables the Accept Order Button.

![Order Accepted](https://user-images.githubusercontent.com/37044020/88919809-62503e80-d289-11ea-9146-fe3351a1c7c9.png)



For now the Employee Features are limited to this.

 ## Admin
 
 This role is to make sure that there are books to load when the user searches for books. Initially at the time of testing, there were 12 books loaded.
 
 Login Page is same for Employee and Admin. 
 
 ![login](https://user-images.githubusercontent.com/37044020/88919849-7136f100-d289-11ea-9336-9c4bf81497bd.png)


This is Login Page for Admin. The credentials are hard-coded into the database.

There are 2 features for Admin Role.They can search for books and they can Add books into the system. They are listed in the photos below.

![SearchBook](https://user-images.githubusercontent.com/37044020/88919845-6f6d2d80-d289-11ea-876e-75f784b86258.png)

![Book Save](https://user-images.githubusercontent.com/37044020/88919848-709e5a80-d289-11ea-8b38-a63e067d364f.png)

For now, The Admin Feature is Limited to this.


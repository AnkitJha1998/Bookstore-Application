var user;
var users;
var books;
var table;
var orders;
var userIddd;
var empIddd;

function createCORSRequest(method,url)
{
    var xhr = new XMLHttpRequest;
    if("withCredentials" in xhr){
        xhr.open(method,url,true);
    }
    else if(typeof XDomainRequest != "undefined")
    {
        xhr = new XDomainRequest();
        xhr.open(method,url);
    }
    else{
        xhr=null;
    }
    return xhr;
}

function loadBooks()
{
    var url="http://localhost:8080/books";
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            books=jsonData;
            
            loadUsers();
        }
    }
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
        console.log("Error," + this.responseText);
    };
    xmlObj.send();
}

function loadUsers()
{
    var url="http://localhost:8080/users";
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            users=jsonData;

            loadOrders();
        }
    }
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
        console.log("Error," + this.responseText);
    };
    xmlObj.send();
}


function getBookObj(id)
{
    for(var i1=0;i1<books.length;i1++)
    {
        if(books[i1].bookId==id)
        {
            return books[i1];
        }
    }
}



function getUserObj(id)
{
    for(var i1=0;i1<users.length;i1++)
    {
        if(users[i1].userId==id)
        {
            return users[i1];
        }
    }
}

function loadOrders()
{
    var url="http://localhost:8080/trans";
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            orders=jsonData;
            for(var i=0;i<jsonData.length;i++)
            {
                if(jsonData[i].accepted==true)
                    continue
                var bookObj=getBookObj(jsonData[i].bookId);
                var userObj=getUserObj(jsonData[i].userId);
                var strAppend="<tr><td class=\"tableCell\">" + jsonData[i].transId + "</td><td class=\"tableCell\">" + userObj.userFirstName + " " + userObj.userLastName + "</td><td class=\"tableCell\">" + bookObj.bookName + "</td><td class=\"tableCell\">" + bookObj.authorFirstName+ " " + bookObj.authorLastName + "</td><td class=\"tableCell\">" + bookObj.price + "</td><td class=\"tableCell\">" + jsonData[i].paytmId + "</td><td class=\"tableCell\"><input type=\"button\" id=\"order"+ jsonData[i].transId+"\" onclick=\"acceptOrder(" + jsonData[i].transId + ")\" value=\"Click To Accept\"></a></td></tr>";
                table.innerHTML+=strAppend;
            }
        }
    }
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
        console.log("Error," + this.responseText);
    };
    xmlObj.send();
}

function loadEmpId()
{
    var url="http://localhost:8080/employee/username/"+user;
    var obj=createCORSRequest("GET",url);
    obj.open("GET",url,true);
    obj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            empIddd=jsonData[0].empId;
        }
    }
    obj.send();
}

window.onload=function()
{
    user=sessionStorage.getItem("username");
    console.log("Username:" + user);
    if(user==null)
    {
        window.location.href="../HTML/EmployeeLogin.html";
    }
    table=document.getElementById("orders");
    table.innerHTML="<tr><th class=\"tableCell\">Order No</th><th class=\"tableCell\">User Full Name</th><th class=\"tableCell\">Book Name</th><th class=\"tableCell\">Author Name</th><th class=\"tableCell\">Book Price</th><th class=\"tableCell\">PayTM Transaction ID</th><th class=\"tableCell\"></th></tr>";
    loadBooks();
    loadEmpId();
}

function signOut()
{
    sessionStorage.removeItem("username");
    window.location.href="../HTML/EmployeeLogin.html";
}

function acceptOrder(id)
{
    console.log("Order Accepted: "+ id);
    var url="http://localhost:8080/trans";
    var obj=createCORSRequest("PUT",url);
    obj.setRequestHeader("Content-type","application/json");
    obj.onload=function()
    {
        if(this.readyState==4 && this.status==202)
        {
            document.getElementById("order"+id).value="Order Accepted";
            document.getElementById("order"+id).disabled=true;
        }
    };
    obj.onerror=function()
    {
        window.alert("Server Offline");
    };
    var ordObj;

    for(var i=0;i<orders.length;i++)
    {
        if(id==orders[i].transId)
        {
            ordObj=orders[i];
            break;
        }
    }

    var jsonData1=JSON.stringify(
        {
            "transId" : ordObj.transId,
            "userId" : ordObj.userId,
            "bookId" : ordObj.bookId,
            "empId" : empIddd,
            "address" : ordObj.address,
            "paytmId" : ordObj.paytmId,
            "accepted" : 1
        }
    );

    obj.send(jsonData1);
    
       
}
var spanTime,selector,search1,search2,logInTab;
var bookId,bookName,bookCategory,bookAuthorFirstName,bookAuthorLastName,bookPrice,bookDesc,bookAvgRating,ratingCount;
var feedbackJson;
var tdId,tdname,tdAuthor,tdDesc,tdGenre,tdPrice,tdrating,tdcount;
var buyBook;
var userName;
var feedbackField;


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

function addComBoBox()
{
    var prepStr="<select name=\"bookCategory\" id=\"bookCategory\" class=\"curvedInput\" style=\"width:60%\"><option value=\"ACTION_ADVENTURE\">Action Adventure</option>";
    prepStr+="<option value=\"ANTHOLOGY\">Anthology</option><option value=\"CLASSIC\">Classic</option>";
    prepStr+="<option value=\"COMIC_NOVEL\">Comic Novel</option>";
    prepStr+="<option value=\"CRIME_DETECTIVE\">Crime Detective</option><option value=\"DRAMA\">Drama</option>";
    prepStr+="<option value=\"FABLE\">Fable</option><option value=\"FAIRY_TALE\">Fairy Tale</option>";
    prepStr+="<option value=\"FAN_FICTION\">Fan Fiction</option>";
    prepStr+="<option value=\"FANTASY\">Fantasy</option>";
    prepStr+="<option value=\"HISTORICAL_FICTION\">Historical Fiction</option>";
    prepStr+="<option value=\"HORROR\">Horror</option>";
    prepStr+="<option value=\"HUMOR\">Humor</option>";
    prepStr+="<option value=\"LEGEND\">Legend</option>";
    prepStr+="<option value=\"MAGICAL_REALISM\">Magical Realism</option>";
    prepStr+="<option value=\"MYSTERY\">Mystery</option>";
    prepStr+="<option value=\"MYTHOLOGY\">Mythology</option>";
    prepStr+="<option value=\"ROMANCE\">Romance</option>";
    prepStr+="<option value=\"SCIENCE_FICTION\">Science Fiction</option><option value=\"SUSPENSE_THRILLER\">Suspense Thriller</option>";
    prepStr+="<option value=\"SOCIAL_COMMENTARY\">Social Commentary</option></select>";
    return prepStr;
}

function selectSet(item)
{
    if(item=="Name")
    {
        spanTime.innerHTML="<input type=\"text\" placeholder=\"Book Name\" id=\"search1\" style=\"width: 60%;\">";
        search1=document.getElementById("search1");
    }
    else if(item=="Author")
    {
        spanTime.innerHTML="<input type=\"text\" placeholder=\"Author First Name\" id=\"search1\" style=\"width: 30%;\"><input type=\"text\" placeholder=\"Author Last Name\" id=\"search2\" style=\"width: 30%;\">"
        search1=document.getElementById("search1");
        search2=document.getElementById("search2");
    }
    else if(item=="Category")
    {
        spanTime.innerHTML=addComBoBox();
        search1=document.getElementById("bookCategory");
    }
}

function onSearchData()
{
    if(selector.value=="Name")
    {
        if(search1.value=="")
        {
            window.alert("Enter some Book Name keywords");
            return;
        }
        sessionStorage.setItem("searchBy","Name");
        sessionStorage.setItem("search1",search1.value);
        window.location.href="../HTML/SearchResult.html";
    }
    else if(selector.value=="Category")
    {
        sessionStorage.setItem("searchBy","Category");
        sessionStorage.setItem("search1",search1.value);
        window.location.href="../HTML/SearchResult.html";
    }
    else if(selector.value=="Author")
    {
        sessionStorage.setItem("searchBy","Author");
        sessionStorage.setItem("search1",search1.value);
        sessionStorage.setItem("search2",search2.value);
        window.location.href="../HTML/SearchResult.html";
    }
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
            var json=JSON.parse(this.responseText);
            var userNames=new Array();
            for(var i=0;i<json.length;i++)
            {
                userNames[i]=json[i].userFirstName+" "+json[i].userLastName;
            }
            console.log(feedbackJson.length);
            for(var i=0;i<feedbackJson.length;i++)
            {
                feedbackField.innerHTML+="<hr><br><div>";
                for(var j=1;j<=5;j++)
                {
                    if(j<=feedbackJson[i].star)
                        feedbackField.innerHTML+="<img src=\"../Pics/SmallColourStar.png\">";
                    else
                        feedbackField.innerHTML+="<img src=\"../Pics/SmallStar.png\">";
                }
                feedbackField.innerHTML+="</div><br><p>Rated By "+userNames[feedbackJson[i].userId-1]+"</p>Feedback: <p>"+feedbackJson[i].feedback;
                feedbackField.innerHTML+="</p><br>";
            }
            feedbackField.innerHTML+="<hr>"
        }
        else
        {
            console.log("Users are not available");
        }
    }
    xmlObj.onerror=function()
    {
        console.error("Server Error");
    }
    xmlObj.send();
}


function loadFeedbackDetails()
{
    var url="http://localhost:8080/feedback/"+bookId;
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            feedbackJson=JSON.parse(this.responseText);     
            console.log(feedbackJson);       
            loadUsers();
        }
        else
        {
            console.log("This book does not exist");
        }
    }
    xmlObj.onerror=function()
    {
        console.error("Server Error");
    }
    xmlObj.send();
}


function loadBookDetails(bookId)
{
    var url="http://localhost:8080/books/"+bookId;
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            bookName=jsonData.bookName;
            bookCategory=jsonData.bookCategory;
            bookAuthorFirstName=jsonData.authorFirstName;
            bookAuthorLastName=jsonData.authorLastName;
            bookPrice=jsonData.price;
            bookDesc=jsonData.bookDesc;
            bookAvgRating=jsonData.avgRating;
            ratingCount=jsonData.ratingCount;
            console.log("Success"+bookName);


            bookNamePlace.innerHTML=bookName;
            tdId.innerHTML=bookId;
            tdname.innerHTML=bookName;
            tdAuthor.innerHTML=bookAuthorFirstName+" "+bookAuthorLastName;
            tdDesc.innerHTML=bookDesc;
            tdGenre.innerHTML=bookCategory;
            tdPrice.innerHTML=bookPrice;
            tdrating.innerHTML=bookAvgRating+" out of 5"
            tdcount.innerHTML=ratingCount;
        }
        else
        {
            console.log("This book does not exist");
        }
    }
    xmlObj.onerror=function()
    {
        console.error("Server Error");
    }
    xmlObj.send();
}

function buyBookMentioned()
{
    if(userName==null)
    {
        window.alert("Sign In first");
        window.location.href="../HTML/Login.html";
        return;
    }
    sessionStorage.setItem("toBeBought",bookId);
    window.location.href="../HTML/Order.html";

}

window.onload=onPageLoadFn;
function onPageLoadFn()
{
    logInTab = document.getElementById("userTab");
    userName=sessionStorage.getItem("userName");
    var fullName=sessionStorage.getItem("personName");
    
    spanTime=document.getElementById("inpBoxes");
    selector=document.getElementById("option");
    
    if(userName==null)
    {
        logInTab.innerHTML="Sign In your Account";
        logInTab.href="Login.html";
    }
    else
    {
        logInTab.innerHTML="Welcome "+fullName+", Your Profile";
        logInTab.href="../HTML/Profile.html";
    }
    selectSet(selector.value);
    //sessionStorage.setItem("bookId",8);
    bookId=sessionStorage.getItem("bookId");
    if(bookId==null)
    {
        window.location.href="../HTML/Home.html";
        return;
    }
    sessionStorage.removeItem("bookId");
    loadBookDetails(bookId)
    bookNamePlace=document.getElementById("bookName");

    tdId=document.getElementById("bookId");
    tdname=document.getElementById("bookName1");
    tdAuthor=document.getElementById("author");
    tdDesc=document.getElementById("bookDesc");
    tdGenre=document.getElementById("bookGenre");
    tdPrice=document.getElementById("price");
    tdrating=document.getElementById("rating")
    tdcount=document.getElementById("count");

    buyBook=document.getElementById("buyBook");
    buyBook.onclick=buyBookMentioned;

    feedbackField=document.getElementById("feedbackSession");
    loadFeedbackDetails();
}




function signOut()
{
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("personName");
    window.location.href="../HTML/Home.html";
}
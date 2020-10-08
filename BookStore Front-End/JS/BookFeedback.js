var spanTime,selector,search1,search2;
var logInTab;
var bookId,bookName,bookCategory,bookAuthorFirstName,bookAuthorLastName,bookPrice,bookDesc,bookDetHeader,bookAvgRating,ratingCount;
var userId;
var selectedStar;
var commentBox;

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

function checkList(string1,string2)
{
    for(var i=0;i<list.length;i++)
    {
        var obj=list[i];
        if(obj[0]==string1 && obj[1]==string2)
            return false;
    }
    return true;
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
            bookDetHeader.innerHTML="<b>"+bookName+"</b> by "+bookAuthorFirstName+" "+bookAuthorLastName;
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

function colorImage(num)
{
    for(var i=1;i<=num;i++)
    {
        (document.getElementById("pic"+String(i))).src="../Pics/StarColoured.png";
    }    
}
function normalStar(obj)
{
    for(var i=5;i>selectedStar;i--)
        (document.getElementById("pic"+String(i))).src="../Pics/Star.png";
    
}
function selected(num)
{
    for(var i=1;i<num;i++)
        (document.getElementById("pic"+String(i))).src="../Pics/StarColoured.png";
    selectedStar=num;        
}

window.onload=onPageLoadFn;
function onPageLoadFn()
{
    logInTab = document.getElementById("userTab");
    var userName=sessionStorage.getItem("userName");
    var fullName=sessionStorage.getItem("personName");

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

    spanTime=document.getElementById("inpBoxes");
    selector=document.getElementById("option");
    selectSet(selector.value);

    bookId=sessionStorage.getItem("recentlyBought");
    userId=sessionStorage.getItem("recentBoughtUserId");
    if(bookId==null || userId==null)
    {
        window.alert("No book data received.");
        return;
    }
    console.log(bookId+":"+userId);
    //sessionStorage.removeItem("recentlyBought");
    //sessionStorage.removeItem("recentBoughtUserId");
    loadBookDetails(bookId);
    selectedStar=0;
    bookDetHeader=document.getElementById("bookDet");
    commentBox=document.getElementById("comments");


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

function feedbackSubmit()
{
    if(selectedStar == 0)
    {
        window.alert("Please mention some rating");
        return;
    }
    var url="http://localhost:8080/feedback";
    var xmlObj=createCORSRequest("POST",url);
    xmlObj.setRequestHeader("Content-type","application/json");
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==201)
        {
            var url1="http://localhost:8080/books";
            var xmlObj1=createCORSRequest("PUT",url1);
            xmlObj1.setRequestHeader("Content-type","application/json");
            xmlObj1.onload=function()
            {   if(this.readyState==4 && this.status==202)
                {
                    window.alert("Feedback Saved Successfully");
                    window.location.href="../HTML/Home.html";
                }
            }
            var newRating=((bookAvgRating*ratingCount)+selectedStar)/(ratingCount+1);
            ratingCount=ratingCount+1;
            var jsonDat1=JSON.stringify({
                "bookId" : bookId,
                "bookName" : bookName,
                "authorFirstName" : bookAuthorFirstName,
                "authorLastName" : bookAuthorLastName,
                "bookCategory" : bookCategory,
                "price" : bookPrice,
                "bookDesc" : bookDesc,
                "avgRating" : newRating,
                "ratingCount": ratingCount

            });
            xmlObj1.send(jsonDat1)

        }
    }
    var jsonData=JSON.stringify(
        {
            "userId" : userId,
            "bookId" : bookId,
            "star" : selectedStar,
            "feedback" : commentBox.value
        });
    xmlObj.send(jsonData);
} 
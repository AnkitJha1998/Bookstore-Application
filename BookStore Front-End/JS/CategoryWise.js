var spanTime,selector,search1,search2;
var logInTab;

var tableRes;
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

    tableRes=document.getElementById("resBooks");
    bookLoad("ACTION_ADVENTURE");
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

function bookLoad(categoryName)
{
    var url="http://localhost:8080/books/category?category="+categoryName;
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            var tableStr="";
            if(jsonData==null)
            {
                tableStr="<tr><td class=\"tablePad\"><h4 style=\"font-weight:bold;\">No Books Under this category</h4></td></tr>";
                tableRes.innerHTML=tableStr;
            }
            else if(jsonData.length==0)
            {
                tableStr="<tr><td class=\"tablePad\"><h4 style=\"font-weight:bold;\">No Books Under this category</h4></td></tr>";
                tableRes.innerHTML=tableStr;
            }
            else
            {
                tableStr="<tr><th class=\"tablePad\">Book Id</th><th class=\"tablePad\">Book Name</th><th class=\"tablePad\">Author</th><th class=\"tablePad\">Price</th></tr>";
                for(var i=0;i<jsonData.length;i++)
                {
                    tableStr+="<tr><td class=\"tablePad\">" + jsonData[i].bookId + "</td><td class=\"tablePad\">" + jsonData[i].bookName + "</td><td class=\"tablePad\">" + jsonData[i].authorFirstName + " " + jsonData[i].authorLastName + "</td><td class=\"tablePad\">" + jsonData[i].price + "</td></tr>";
                }
                tableRes.innerHTML=tableStr;
            }
        }
    };
    xmlObj.onerror=function()
    {
        console.log("Server Offine");
    }
    xmlObj.send();
}
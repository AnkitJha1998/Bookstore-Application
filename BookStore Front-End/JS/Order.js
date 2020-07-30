var spanTime,selector,search1,search2;
var logInTab;
var userId;
var inp1,inp2,inp3;
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
        var url="http://localhost:8080/user/username?Username="+userName;
        var xmlObj=createCORSRequest("GET",url);
        xmlObj.open("GET",url,true);
        xmlObj.onload=assignUser;
        xmlObj.send();
    }

    spanTime=document.getElementById("inpBoxes");
    selector=document.getElementById("option");
    selectSet(selector.value);

    inp1=document.getElementById("bookId");
    inp2=document.getElementById("address");
    inp3=document.getElementById("paytmId");

}

function assignUser()
{
    if(this.readyState==4 && this.status==200)
    {
        var jsonData1=JSON.parse(this.responseText);
        userId=jsonData1[0].userId;
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

function storeOrder()
{
    var userName=sessionStorage.getItem("userName");
    var fullName=sessionStorage.getItem("personName");

    if(userName==null)
    {
        window.alert("Sign In first");
        return;
    }
    if(inp1.value=="" || inp2.value=="" || inp3.value=="")
    {
        window.alert("Enter All Fields");
        return;
    }
    var urlBook="http://localhost:8080/books/"+inp1.value;
    var xmlObj1=createCORSRequest("GET",urlBook);
    xmlObj1.open("GET",urlBook,true);
    xmlObj1.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            if(jsonData==null)
            {
                window.alert("No Such Book Exist");
                inp1.value="";
                inp2.value="";
                inp3.value="";
                return;
            }
            else if(jsonData.length==0)
            {
                window.alert("No Such Book Exist");
                inp1.value="";
                inp2.value="";
                inp3.value="";
                return;
            }
            else
            {
                var url="http://localhost:8080/trans";
                var xmlObj=createCORSRequest("POST",url);
                xmlObj.setRequestHeader("Content-type","application/json");
                xmlObj.onload=function()
                {
                    if(this.readyState==4 && this.status==201)
                    {
                        window.alert("Data Stored Successfully");
                        inp1.value="";
                        inp2.value="";
                        inp3.value="";
                    }
                    else
                    {
                        console.log("Error:" + this.responseText);
                    }
                }
                var jsonData=JSON.stringify({
                    "userId": userId,
                    "bookId": inp1.value,
                    "empId":-1,
                    "address": inp2.value,
                    "paytmId": inp3.value,
                    "accepted": 0
                });
                xmlObj.send(jsonData);


            }
        }
    }
    xmlObj1.send();

}
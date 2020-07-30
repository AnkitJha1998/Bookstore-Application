var spanTime,selector,search1,search2;
var userId;
var logInTab;
var userHead;
var orderTable;
var passTable,oldPass,newPass,confPass;
var userObj;

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

function loadUserId(name)
{
    var url="http://localhost:8080/user/username?Username="+name;
    console.log(name);
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            userId=jsonData[0].userId;
            userObj=jsonData[0];
            loadOrders();

        }
        else
        {
            console.log("Error");
        }
    };
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
    };
    xmlObj.send();
}

function loadOrders()
{
    var url="http://localhost:8080/trans/userId/"+userId;
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==200)
        {
            var jsonData=JSON.parse(this.responseText);
            var tableStr="<tr><th class=\"socialCell\">Order No</th><th class=\"socialCell\">Book Name</th><th class=\"socialCell\">Author Name</th><th class=\"socialCell\">Book Price</th><th class=\"socialCell\">Order Accepted</th></tr>"
            orderTable.innerHTML=tableStr;
            for(var i=0;i<jsonData.length;i++)
            {
                var obj=jsonData[i];
                console.log("Initial Obj"+obj);
                var url="http://localhost:8080/books/"+obj.bookId;
                var xmlObj=createCORSRequest("GET",url);
                xmlObj.open("GET",url,true);
                xmlObj.extraInfo=obj;
                xmlObj.onload=function()
                {
                    console.log("Hello World"+this.extraInfo);
                    if(this.readyState==4 && this.status==200)
                    {
                        var jsonData1=JSON.parse(this.responseText);
                        console.log(jsonData1);
                        obj=this.extraInfo;
                        var statAccept="Not Accepted";
                        if(obj.accepted==true)
                        {
                            statAccept="Accepted";
                        }
                        orderTable.innerHTML+="<tr><td class=\"socialCell\">" + obj.transId + "</td><td class=\"socialCell\">" + jsonData1.bookName + "</td><td class=\"socialCell\">" + jsonData1.authorFirstName + " " + jsonData1.authorLastName +"</td><td class=\"socialCell\">" + jsonData1.price + "</td><td class=\"socialCell\">" + statAccept + "</td></tr>";
                    }
                };
                xmlObj.onerror=function()
                {
                    window.alert("Server Error");
                }
                xmlObj.send();
            }

        }
        else
        {
            console.log("Error");
        }
    };
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
    };
    xmlObj.send();
}

window.onload=onPageLoadFn;
function onPageLoadFn()
{
    logInTab = document.getElementById("userTab");
    var userName=sessionStorage.getItem("userName");
    var fullName=sessionStorage.getItem("personName");
    
    spanTime=document.getElementById("inpBoxes");
    selector=document.getElementById("option");
    document.getElementById("Userrname").innerHTML=fullName;
    orderTable=document.getElementById("orderList");

    userHead=document.getElementById("user");
    userHead.innerHTML=userName;
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
    loadUserId(userName);
    passTable=document.getElementById("passTable");
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


function changePass()
{
    passTable.style.display="block";
    oldPass=document.getElementById("oldPass");
    newPass=document.getElementById("newPass");
    confPass=document.getElementById("confPass");
}

function updateUserss()
{
    if(oldPass.value=="" || newPass.value=="" || confPass=="")
    {
        window.alert("Enter values in the input");
        return;
    }
    if(userObj.credPass!=oldPass.value)
    {
        window.alert("Old Password Incorrect");
        return;
    }
    else if(newPass.value!=confPass.value)
    {
        window.alert("Passwords Don't Match");
        return;
    }
    var url="http://localhost:8080/users";
    var xmlObj=createCORSRequest("PUT",url);
    xmlObj.setRequestHeader("Content-type","application/json");
    xmlObj.onload=function()
    {
        if(this.readyState==4 && this.status==202)
        {
            window.alert(this.responseText);
            passTable.style="display:none";
        }
        else
        {
            console.log(this.responseText);
            window.alert("There Has been a problem with saving the data");
        }
    };
    xmlObj.onerror=function()
    {
        window.alert("Server Offline");
        console.log("Server Offline");
    };
    var sendData=JSON.stringify(
        {
            "userId" : userObj.userId,
            "userFirstName" : userObj.userFirstName,
            "userLastName" : userObj.userLastName,
            "credUser" : userObj.credUser,
            "credPass" : newPass.value,
            "penalty" : userObj.penalty,
            "bookIssue" : userObj.bookIssue 
        }
    );
    xmlObj.send(sendData);

}

function signOut()
{
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("personName");
    window.location.href="../HTML/Home.html";
}
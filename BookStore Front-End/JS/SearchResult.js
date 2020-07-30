var table;
var selector,search1,search2;
var spanTime;
var tempName,tempSelect;
var logInTab;
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
    var prepStr="<select name=\"bookCategory\" id=\"bookCategory\" class=\"curvedInput\" style=\"width: 60%\"><option value=\"ACTION_ADVENTURE\">Action Adventure</option>";
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




window.onload=function()
{
    table=document.getElementById("result");
    spanTime=document.getElementById("inpBoxes");
    selector=document.getElementById("option");
    selectSet(selector.value);

    var cat=sessionStorage.getItem("searchBy");
    console.log(cat);
    var search1Item,search2Item;
    if(cat=="Author")
    {
        search1Item=sessionStorage.getItem("search1");
        search2Item=sessionStorage.getItem("search2");
        sessionStorage.removeItem("search1");
        sessionStorage.removeItem("search2");
        sessionStorage.removeItem("searchBy");
        searchResult(cat,search1Item,search2Item);        
    }
    else if(cat!=null)
    {
        search1Item=sessionStorage.getItem("search1");
        sessionStorage.removeItem("search1");
        sessionStorage.removeItem("search2");
        sessionStorage.removeItem("searchBy");
        console.log(search1Item);
        console.log(cat);
        searchResult(cat,search1Item,null);
    }
    else
    {
        table.innerHTML="No Result";
    }
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


}


function displayTable(list)
{   
    table.innerHTML="<tr><th class=\"tableCell\">Book Id</th><th class=\"tableCell\">Book Name</th><th class=\"tableCell\">Book Category</th><th class=\"tableCell\">Author</th><th class=\"tableCell\">Price</th></tr>";
    var innerHTMLStr="";
    for(var i=0;i<list.length;i++)
    {
        innerHTMLStr+="<tr><td class=\"tableCell\">"+list[i].bookId+"</td><td class=\"tableCell\">"+list[i].bookName+"</td><td class=\"tableCell\">"+list[i].bookCategory+"</td><td class=\"tableCell\">"+list[i].authorFirstName+" "+list[i].authorLastName+"</td><td class=\"tableCell\">"+list[i].price+"</td></tr>";
    }
    table.innerHTML+=innerHTMLStr;
}


function loadResults()
{
    if(this.readyState==4 && this.status==200)
    {
        var getJsonData=JSON.parse(this.responseText);
        if(getJsonData==null)
        {
            table.innerHTML="No Data to Display";
            return;
        }
        if(getJsonData.length==0)
        {
            table.innerHTML="No Data to Display";
            return;
        }
        if(tempSelect=="Name")
        {
            var toDisplay=[];
            for(var i=0;i<getJsonData.length;i++)
            {
                var comparename=(getJsonData[i].bookName).toLowerCase();
                var obtainString=(tempName).toLowerCase();
                if(comparename.includes(obtainString)==true)
                    toDisplay.push(getJsonData[i])
            }
            if(toDisplay.length==0)
            {
                console.log("0 lenngth");
                table.innerHTML="No Data to Display";
                return;
            }
            else
                displayTable(toDisplay);
        }
        else
        {
            
            displayTable(getJsonData);
        }
    }
    else
    {
        console.log("Error Here,"+this.readyState+" "+this.status);
    }
}

function buttonCall()
{
    if(selector.value=="Author")
        searchResult(selector.value,search1.value,search2.value);
    else if(selector.value=="Name" && search1.value=="")
        window.alert("Enter some keyword to search");
    else
        searchResult(selector.value,search1.value);
}

function searchResult(cate,sear1,sear2)
{
    var url="http://localhost:8080/books";
    if(cate=="Category")
    {
        url+="/category?category="+sear1;
    }
    else if(cate=="Author")
    {
        if(sear1=="" && sear2=="")
            url+="";
        
        else if(sear1!="" && sear2=="")
            url+="/author?fName="+sear1;
        
        else if(sear1=="" && sear2!="")
            url+="/author?lName="+sear2;
        
        else
            url+="/author?fName="+sear1+"&&lName="+sear2;
    }
    console.log(url);
    tempName=sear1;
    tempSelect=cate;
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=loadResults
    xmlObj.send();
}
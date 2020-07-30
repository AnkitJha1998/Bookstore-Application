var select,search1,search2;
var tc1,tc2;
var tableRes, headerTag;

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

window.onload=function()
{
    select=document.getElementById("searchSelect");
    tc1=document.getElementById("search1");
    tc2=document.getElementById("search2");
    onSelectChange("Name");
    tableRes=document.getElementById("results");
    tableRes.style.display="none";
    headerTag=document.getElementById("resultH");
    headerTag.style.display="none";

    var adminUser=sessionStorage.getItem("username");
    if(adminUser==null)
    {
        window.location.href="../HTML/EmployeeLogin.html";
    }



}

function addComBoBox()
{
    var prepStr="<select name=\"bookCategory\" id=\"bookCategory\" class=\"curvedInput\"><option value=\"ACTION_ADVENTURE\">Action Adventure</option>";
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

function onSelectChange(searchBox)
{
    if(searchBox=="Name")
    {
        tc1.innerHTML="<input type=\"text\" id=\"searchText1\" class=\"curvedInput\" placeholder=\"Book Name\">";
        tc2.innerHTML="";
        search1=document.getElementById("searchText1");
    }   
    else if(searchBox=="Category")
    {
        tc1.innerHTML=addComBoBox();
        tc2.innerHTML="";
        search1=document.getElementById("bookCategory");        
    }
    else if(searchBox=="Author")
    {
        tc1.innerHTML="<input type=\"text\" id=\"searchText1\" class=\"curvedInput\" placeholder=\"Author First Name\">";
        search1=document.getElementById("searchText1");
        tc2.innerHTML="<input type=\"text\" id=\"searchText2\" class=\"curvedInput\" placeholder=\"Author Last Name\">";
        search2=document.getElementById("searchText2");
    }
}



function displayTable(list)
{
    tableRes.innerHTML="<tr><th class=\"tableCell\">Book Name</th><th class=\"tableCell\">Book Category</th><th class=\"tableCell\">Author</th><th class=\"tableCell\">Price</th></tr>";
    headerTag.style.display="block"
    headerTag.innerHTML="Search Results";
    tableRes.style.display="block";
    console.log(list)
    var innerHTMLStr="";
    for(var i=0;i<list.length;i++)
    {
        innerHTMLStr+="<tr><td class=\"cellWithPadding\">"+list[i].bookName+"</td><td class=\"cellWithPadding\">"+list[i].bookCategory+"</td><td class=\"cellWithPadding\">"+list[i].authorFirstName+" "+list[i].authorLastName+"</td><td class=\"cellWithPadding\">"+list[i].price+"</td></tr>";
    }
    tableRes.innerHTML+=innerHTMLStr;

}


function loadResults()
{
    if(this.readyState==4 && this.status==200)
    {
        var getJsonData=JSON.parse(this.responseText);
        
        if(getJsonData==null)
        {
            headerTag.innerHTML="No Data to Display";
            tableRes.style.display="none";
            return;
        }
        if(getJsonData.length==0)
        {
            headerTag.innerHTML="No Data to Display";
            tableRes.style.display="none";
            return;
        }
        if(select.value=="Name")
        {
            var toDisplay=[];
            for(var i=0;i<getJsonData.length;i++)
            {
                var comparename=(getJsonData[i].bookName).toLowerCase();
                var obtainString=(search1.value).toLowerCase();
                if(comparename.includes(obtainString)==true)
                    toDisplay.push(getJsonData[i])
            }
            console.log(toDisplay.length);
            if(toDisplay.length==0)
            {
                console.log("0 lenngth");
                headerTag.style.display="block";
                headerTag.innerHTML="No Data to Display";
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


function searchData()
{
    var url="http://localhost:8080/books";
    console.log("Entered SearchData()");
    if(select.value=="Category")
    {
        url+="/category?category="+search1.value;
    }
    else if(select.value=="Author")
    {
        if(search1.value=="" && search2.value=="")
            url+="";
        
        else if(search1.value!="" && search2.value=="")
            url+="/author?fName="+search1.value;
        
        else if(search1.value=="" && search2.value!="")
            url+="/author?lName="+search2.value;
        
        else
            url+="/author?fName="+search1.value+"&&lName="+search2.value;
    }
    console.log(url);
    var xmlObj=createCORSRequest("GET",url);
    xmlObj.open("GET",url,true);
    xmlObj.onload=loadResults
    xmlObj.send();
}

function signOut()
{
    sessionStorage.clear("username");
    window.location.href="../HTML/EmployeeLogin.html";
}
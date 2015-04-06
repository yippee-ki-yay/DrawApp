<!DOCTYPE html>
<%@ page import="com.google.appengine.api.datastore.DatastoreService" %>
<%@ page import="com.google.appengine.api.datastore.DatastoreServiceFactory" %>
<%@ page import="com.google.appengine.api.datastore.Entity" %>
<%@ page import="com.google.appengine.api.datastore.FetchOptions" %>
<%@ page import="com.google.appengine.api.datastore.Key" %>
<%@ page import="com.google.appengine.api.datastore.KeyFactory" %>
<%@ page import="com.google.appengine.api.datastore.Query" %>
<%@ page import="com.google.appengine.api.datastore.Text" %>

<%
		String id = request.getParameter("play");
		String rezultat = "";

		if(id != null){
		 	Key idKey = KeyFactory.createKey("drawing", id); 
		 	DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			Entity nasao = datastore.get(idKey);
			rezultat = ((Text) nasao.getProperty("pos")).getValue();
         }
%>

<html>
    <head>
        <title>Send a message</title>
        <link rel="stylesheet" type="text/css" href="mainpage.css">
        <script>  var s="<%=rezultat%>"; console.log(s);</script>
        <script src="main.js">
           </script> 
    </head>
   
    
    <body onload="draw();">
        <header>
            <h1>Draw and send to others<span id="pos"></span></h1>
        </header>
        
        <button type="button" class="myButton" onclick="replay();">Replay</button>
        <button type="button" class="myButton" onclick="clearCanvas();">Clear</button>
        <button type="button" class="myButton" onclick="send();">Generate link</button>
        <input type="text" class="myTextBox" id="linkBox">
        
        <canvas id="c" width="1000" height="420"></canvas>
        
    </body>
</html>
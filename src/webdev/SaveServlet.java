package webdev;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.UUID;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.datastore.Text;

public class SaveServlet extends HttpServlet 
{

	@Override
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
			throws IOException 
	{
		// TODO Auto-generated method stub
		  StringBuilder buffer = new StringBuilder();
		    BufferedReader reader = req.getReader();
		    String line;
		    while ((line = reader.readLine()) != null) {
		        buffer.append(line);
		    }
		    String data = buffer.toString();
		    
		    String uuid = UUID.randomUUID().toString();
		    
		    Key idKey = KeyFactory.createKey("drawing", uuid);
		    
		    Text posText = new Text(data);
		    
		    Entity drawing = new Entity("drawing", uuid);
		    drawing.setProperty("pos", posText);
		    
		    
		    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
		    datastore.put(drawing);
	
		    PrintWriter writer = resp.getWriter();
		    writer.write(uuid);
		
		    
	}
	


}

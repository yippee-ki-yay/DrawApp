package webdev;

import java.io.IOException;

import javax.servlet.http.*;

@SuppressWarnings("serial")
public class DrawappServlet extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
			resp.sendRedirect("draw.jsp");
	}
}

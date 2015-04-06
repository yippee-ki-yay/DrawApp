         var posArray = [];
            var ctx;
            var canvas;
            var rect;
            var started;
            var generated = false;
            var inreplay = false;
            
            	function send()
            	{
            		if(generated == true)return;
            		
            		generated = true;
            		
                    var textBox = document.getElementById("linkBox");
                                      
            		var httpReq = new XMLHttpRequest();
            		
            		httpReq.onreadystatechange = function()
            		{
            			if (httpReq.readyState==4 && httpReq.status==200)
            			{
            				textBox.value = 'http://1-dot-animmsg.appspot.com/draw.jsp?play=' + httpReq.responseText;
            			}
            		}
            		
            		httpReq.open("POST", "SaveServlet", true);
            		httpReq.send(posArray.toString());
            	}
            
                function draw()
                {
                    canvas = document.getElementById('c');
                    ctx = canvas.getContext('2d');
                    ctx.strokeStyle = '#126bbe';
                 
                    
                    if(s != "")
                    	{
                    		posArray = s.split(",");
                    		for(var p = 0; p < posArray.length;++p)
                    			console.log(posArray[p]);
                    		
                    		replay();
                    	}
                    
                    rect = canvas.getBoundingClientRect();
                    started = false;
                    
                     ctx.clearRect( 0 , 0 , 1000, 420);
                    
                    canvas.onmousedown = function(e)
                    {
                    	if(inreplay == false){
                        started = true;
                        ctx.lineWidth = 4;
                        ctx.lineJoin = ctx.lineCap = 'round';
                        ctx.beginPath();
                        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                    	}
                        
                    };
                    
                    canvas.onmousemove = function(e)
                    {
                        if(started)
                        {
                        	if(inreplay == false){
                            ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                            ctx.stroke();
                            posArray.push(e.clientX - rect.left);
                            posArray.push(e.clientY - rect.top);
                        	}
                        }
                    };
                    
                    canvas.onmouseup = function(e)
                    {
                        if(started){
                        started = false;
                        //posalji mu -1 ako je korisnik pustio misa da znamo da crtamo iz neke druge tacke
                        posArray.push('n');
                        posArray.push('n');
                        }
                    };     
                
                }
            
              function replay()
              {
                
            	inreplay = true;
                ctx.clearRect( 0 , 0 , 1000, 420);
                started = false;
                ctx.lineWidth = 4;
                ctx.lineJoin = ctx.lineCap = 'round';
                  
                var x = posArray[0];
                var y = posArray[1];
                  
                console.log(posArray.length);
                  
                ctx.beginPath();
                ctx.moveTo(x, y);
                  
                var i = 2;
                  
                var t = setInterval(function()
                {
                    if(posArray[i] == 'n' && posArray[i] == 'n')
                    {
                        started = true;
                        ctx.lineWidth = 4;
                        ctx.lineJoin = ctx.lineCap = 'round';
                        ctx.beginPath();
                         if(i < posArray.length)
                    {
                        ctx.moveTo(posArray[i+2], posArray[i+3]); 
                        i+=2;}
                    }
                    
                    ctx.lineTo(posArray[i], posArray[i+1]);
                    ctx.stroke(); 
                    
                    if(i >= posArray.length)
                    {
                       window.clearInterval(t);
                       started = false;
                       inreplay = false;
                    }
                    
                    i += 2;
                
                }, 10);
                                
              }
            
            function clearCanvas()
            {
                ctx.clearRect( 0 , 0 , 1000, 420);
                started = false;
                posArray = [];
               
            }
            
           
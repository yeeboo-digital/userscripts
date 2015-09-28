// ==UserScript==
// @name         Convio WYSIWYG Fixer
// @namespace    conviowysiwygfixer
// @author       Arthur Hanna
// @description  This userscript fixes annoying behavior in Convio's terrible WYSIWYG.
// @match        https://secure3.convio.net/ta/admin/CommCenter*
// @version      0.76
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.

	// Count unstyled elements? This code doesn't work.
	
	// var n = jQ( "#html_editorhtml_ifr" ).contents().find( "li" ).length;

    // jQ( "#html_editorrow1" ).text( "There are " + n + " unstyled lis" );
    


  // Create custom buttons!
  
	jQ(".field-hint").append("<div id='tabuttons' style='padding: 10px;'></div><div id='tamessages' style='padding: 10px;'>");

  jQ( "#tabuttons" ).append( "<span id='checkbroken' class='fixers'><strong>Check code.</strong></span>");

  jQ( "#tabuttons" ).append( "<span id='fixlinks' class='fixers'><strong>Fix link stylings</strong></span>");
  
  jQ( "#tabuttons" ).append( "<span id='fixbullets' class='fixers'><strong>Fix bullet styles</strong></span>");
  
  jQ(".field-hint").css({"padding": "15px 0", });
    jQ(".field-hint").css({"padding": "15px 0", });
  // Styling for custom links
  
  jQ(".fixers").css({"margin-right": "15px", "border": "2px solid #ccc", "padding": "3px", "border-radius": "3px"});
  
  // Let's fix the links onclick
  
  jQ( "#fixlinks" ).click(function() {
     
     		// Need to modify this code to detect whether these have inline styles.
     
			var n = jQ( "#html_editorhtml_ifr" ).contents().find( "a" ).length;

			jQ( "#tamessages" ).text( "Fixed " + n + " unstyled links." );
  
	// This isn't totally perfect, since some links aren't bold, i.e. calendar adds.  
  
  jQ( "#html_editorhtml_ifr" ).contents().find( "a" ).css({
  
  		"text-decoration": "underline",
  		"color": "#f05c22",
  		"font-weight": "bold",

  	});
  		
  
});

  jQ( "#fixbullets" ).click(function() {
  
  			// Need to modify this code to detect whether these have inline styles.

			var n = jQ( "#html_editorhtml_ifr" ).contents().find( "li" ).length;

			jQ( "#tamessages" ).text( "Fixed " + n + " unstyled list items." );


		  jQ( "#html_editorhtml_ifr" ).contents().find( "li" ).css({
  
				"margin-bottom": "1em",
				"font-size": "16px",
				"line-height": "28px",
				"font-family": "georgia,serif",
				"color": "#000000",

			});

});


  jQ( "#checkbroken" ).click(function() {

			// Check for unstyled elements. This doesn't work currently.
	
			var unlis = jQ( "#html_editorhtml_ifr" ).contents().find( "li [style*='regular']").length;
			
			var unas = jQ( "#html_editorhtml_ifr" ).contents().find( "a" ).length;
			
			jQ( "#tamessages" ).text( "There are " + unlis + " unstyled list items. There are " + unas + " unstyled links.");



});


}

// load jQuery and execute the main function
addJQuery(main);
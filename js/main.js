(function( $ ) {
	var evaluate = $( '#evaluate-input' ),
		input    = $( '#input' ),
		output   = $( '#color-output' )
		matches  = [];

	var stylesheetTemplate = $( '#color-function-stylesheet' ),
		entryTemplate      = $( '#entry-template' );


	evaluate.on( 'submit', function( e ){
		e.preventDefault();
		output.html( '' );

		var tempInput = input.val(),
			reg = new RegExp(/\$(.+):/g);

		var result;
		while ( ( result = reg.exec( tempInput ) ) !== null ) {
			var result = result[1];
			matches.push( result );
			tempInput += ( '.' + result + ' { background: $' + result + '; }\n' );
		}

		var styleTemplate = Handlebars.compile( stylesheetTemplate.html() ),
			stylesheet    = styleTemplate( { styles: Sass.compile( tempInput ) } ),
			colorTemplate = Handlebars.compile( entryTemplate.html() );

		output.append( stylesheet );

		var matchCount = matches.length;
		for ( var i = 0; i < matchCount; i++ ) {
			output.append( colorTemplate( { colorVar: matches[ i ] } ) );
		}

		output.children().each( function( index, element ){
			var hexColor = $( element ).backgroundHexColor();

			if ( 'undefined' != typeof hexColor ) {
				$( element ).find( '.hex' ).html( hexColor );
			} else {
				$( element ).hide();
			}
		});
	});
})( jQuery );
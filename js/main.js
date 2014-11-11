(function( $ ) {
	var evaluate = $( '#evaluate-input' ),
		input    = $( '#input' ),
		output   = $( '#color-output' );

	var stylesheetTemplate = $( '#color-function-stylesheet' ),
		entryTemplate      = $( '#entry-template' );


	evaluate.on( 'submit', function( e ){
		e.preventDefault();
		output.html( '' );

		var tempInput = ( input.val().length ) ? input.val() : input.attr( 'placeholder' ),
			matches = tempInput.match(/\$(.+):/g);

		var styleTemplate = Handlebars.compile( stylesheetTemplate.html() ),
			colorTemplate = Handlebars.compile( entryTemplate.html() );

		var matchCount = matches.length;
		for ( var i = 0; i < matchCount; i++ ) {
			var trimmed = matches[ i ].substr( 1 ).substr( 0, matches[ i ].length - 2 );
			output.append( colorTemplate( { colorVar: trimmed } ) );
			tempInput += ( '.' + trimmed + ' { background: $' + trimmed + '; }\n' );
		}

		output.append( styleTemplate( { styles: Sass.compile( tempInput ) } ) );

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
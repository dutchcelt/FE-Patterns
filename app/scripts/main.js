import test1 from './test1';
import 'dutchcelt/Dater';
import domready from 'ded/domready';
//(function(){
	Promise.all( [domready] ).then( function( ){
		domready( function(){
			test1();
			$( "input" ).dater( {placeholder: "day-month-year"} );
		} );
	} );
//}());
//import 'dutchcelt/FEP.Tabs';
//import domready from 'ded/domready';
//
//(function(){
//	Promise.all( [domready] ).then( function( ){
//		$( 'body' ).append( "<p>test2<\/p>" );
//		domready( function(){
//			window.domready = domready;
//			$( 'body' ).append( "<p>test3<\/p>" );
//			$( "input" ).dater( {placeholder: "day-month-year"} );
//		} );
//	} );
//}());
//

export { test1 as m };

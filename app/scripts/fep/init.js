require(
	[ 'jquery' ], function(){
		//  JQUERY DOMREADY
		$( document ).ready( function(){
			FEP.lazyload.init( FEP.config.getArray() );
		} );
	}
);



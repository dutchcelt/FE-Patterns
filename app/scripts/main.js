import 'jquery';
import 'dutchcelt/FEP-Tabs';
import 'font-awesome';
import 'dutchcelt/FEP-KeepInView';
import 'dutchcelt/Dater';


// We like javascript. Add 'js' class to allow for styling fallbacks, just in case.
document.getElementsByTagName( "HTML" )[0].className = 'js';

let init = () => {

	// Make the menu sticky. (will be fired on all pages)
	FEP.KeepInView( 'nav', { zindex: 42, cloned: true } );
	FEP.KeepInView( '.tabs-list', { zindex: 42, edgeOffset: 30 } );
	$("input").dater({placeholder: "day-month-year"});
	FEP.tabs('.tabs');
	console.log($().jquery, FEP);

};

export { init };

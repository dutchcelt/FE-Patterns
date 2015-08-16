import test2 from './test2';
alert('test1')

var test1 = function(){
	console.log(test2());
};
export { test1 as default };

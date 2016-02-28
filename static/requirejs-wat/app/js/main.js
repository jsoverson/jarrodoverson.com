
require(['foo','plugin!bar'],function(foo, bar){
  console.log(foo.foo);
  console.log(bar.foo);
});

define({
  load: function (name, req, load, config) {
    req([name], function (original) {
      console.log(original.foo);
      load(original);
    });
  }
});

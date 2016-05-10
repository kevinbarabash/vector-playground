syntax '+' = function (ctx) {
  let bodyCtx = ctx.next().value.inner();

  // default constructor if none specified
  let result = #``;
  for (let item of bodyCtx) {
    result = result.concat(#`${item}`);
  }
  return #`new Point(${result})`;
}

+ (1,2,3,4);

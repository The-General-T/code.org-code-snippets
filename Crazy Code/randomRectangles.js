function randomRectangles(w,h,color) {
  if (!w) w = 10;
  if (!h) h = 10;
  if (!color) color = "black";
  fill(color);
  rect(randomNumber(10,390), randomNumber(10,390),w,h);
  rect(randomNumber(10,390), randomNumber(10,390),w,h);
  rect(randomNumber(10,390), randomNumber(10,390),w,h);
  rect(randomNumber(10,390), randomNumber(10,390),w,h);
}

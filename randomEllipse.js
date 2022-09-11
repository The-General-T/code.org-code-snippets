function randomEllipse(w,h,color) {
  if (!w) w = 10;
  if (!h) h = 10;
  if (!color) color = "black";
  fill(color);
  ellipse(randomNumber(10,390), randomNumber(10,390),w,h);
  ellipse(randomNumber(10,390), randomNumber(10,390),5,5);
  ellipse(randomNumber(10,390), randomNumber(10,390),5,5);
  ellipse(randomNumber(10,390), randomNumber(10,390),5,5);
  ellipse(randomNumber(10,390), randomNumber(10,390),5,5);
}

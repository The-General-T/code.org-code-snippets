function abstractArtGenerator(w,h,color) {
  //Call in a loop :)
  if (!w) w = 10;
  if (!h) h = 10;
  if (!color) color = rgb(randomNumber(0,255),randomNumber(0,255),randomNumber(0,255));
  fill(color);
  rect(randomNumber(10,390),randomNumber(10,390),w,h);
  triangle(randomNumber(5,395),randomNumber(5,395),randomNumber(5,395),randomNumber(5,395),randomNumber(5,395),randomNumber(5,395));
  ellipse(randomNumber(10,390), randomNumber(10,390),w,h);
}

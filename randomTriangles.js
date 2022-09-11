function randomTriangles(color) {
  if (!color) color = "black";
  fill(color);
  noStroke();
  triangle(randomNumber(5,395),randomNumber(5,395),randomNumber(5,395),randomNumber(5,395),randomNumber(5,395),randomNumber(5,395));
}

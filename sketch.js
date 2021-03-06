/*eslint-disable */
var snack
var scl = 20
var item
function setup () {
  createCanvas(600, 600)
  s = new snackClass()
  frameRate(10)
  // item = createVector(random(width), random(height))
  itemLocation()
}

function draw () {
  background(51)
  s.update()
  s.show()
  // eating function //
  if (s.eat(item)) {
    itemLocation()
  }
  /////////////////////
  var R = Math.floor(Math.random() * 200) + 55
  var G = Math.floor(Math.random() * 200) + 55
  var B = Math.floor(Math.random() * 200) + 55
  fill(R, G, B)
  rect(item.x, item.y , scl, scl)
}


function itemLocation () {
  var cols = floor(width / scl)
  var rows = floor(height / scl)

  item = createVector(floor(random(cols)), floor(random(rows)))
  item.mult(scl)
  // console.log('item  ', item)
}



function keyPressed () {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1)
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0)
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0)
  }
}





//////////////////////////////////////////
      // CLASS snackClass
//////////////////////////////////////////
function snackClass () {
  this.x = 0
  this.y = 0
  this.Xspeed = 0
  this.Yspeed = 0

  this.tail = []
  this.total = 0
  this.pass = true

  this.dir = function (x, y) {
    // console.log(x, y)
    this.Xspeed = x
    this.Yspeed = y
  }
  this.update = function () {
    // console.log(this.tail.length)
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1]
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y)
    console.log(this.tail)

    this.x = this.x + this.Xspeed * scl
    this.y = this.y + this.Yspeed * scl

    this.x = constrain(this.x, 0, width - scl)
    this.y = constrain(this.y, 0, height - scl)
  }
  this.show = function () {
    fill(255)
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl)
    }
    fill(255, 0, 100)
    rect(this.x, this.y, scl, scl)
  }

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y)
    if (d < 1) {
      this.total++
      return true
    }
    else return false
  }
}

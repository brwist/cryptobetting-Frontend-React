export const closestToOne = (x, y) =>{
    if (x != y)
    {
    var x1 = Math.abs(x - 100);
    var y1 = Math.abs(y - 100);
  
    if (x1 < y1)
    {
      return x;
    }
    if (y1 < x1)
    {
      return y;
    }
    return 0;
    }
    else
      return false;
  }
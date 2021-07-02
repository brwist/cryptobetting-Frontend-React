export const expiryTimeToLocaleString = (expiryTime) => {
  var date = new Date(expiryTime).toLocaleString().split(" ");
  var time = date[1];
  time=time.split(':')
  var hours = parseInt(time[0]);
  var mins = parseInt(time[1]);
  hours = (hours < 10) ? "0" + hours : hours;
  mins = (mins < 10) ? "0" + mins : mins;
  // Putting it all together
  return(hours + '.' + mins);
}
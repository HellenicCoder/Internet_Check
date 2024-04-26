const popup = document.querySelector(".popup"),
wifiIcon = document.querySelector(".icon i"),
popupTitle = document.querySelector(".popup .title"),
popupDesc = document.querySelector(".desc"),
reconnectBtn = document.querySelector(".reconnect");

let isOnline = true, intervalId, timer = 10;

const checkConnection = async () => {
    try{
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      //if the status code is between 200 or 300 the network connection considered online
      isOnline = response.status >= 200 && response.status <= 300;
    } catch(error){
       isOnline = false;// if there is an error the connection is considered offline
    }
    timer = 10;
    clearInterval(intervalId);
    handlePopup(isOnline);
}
const handlePopup = (status) =>{
   if(status){
    wifiIcon.className = "uil uil-wifi";
    popupTitle.innerText = "Restored Connection";
    popupDesc.innerHTML = "your device is now sucessfully conneccted to the internet";
    popup.classList.add("online");
    return setTimeout(() =>popup.classList.remove("show"), 2000) ;
   } 
   wifiIcon.className = "uil uil-wifi-slash";
   popupTitle.innerText = "Lost Connection";
   popupDesc.innerHTML = "your network is unavailable. we will attempt to reconnect you in <b>10</b> seconds.";
   popup.className = "popup show";
  
   intervalId = setInterval(() => { // set an interval to decrease the timer by 1 every second
       timer--;
       if(timer === 0) checkConnection();//if the timewr reaches 0, check the connection again
       popup.querySelector(".desc b").innerText = timer;
   }, 1000);
}
//only if isOnline is true, check the connection status every 3s
setInterval(() => isOnline && checkConnection(), 3000);
reconnectBtn.addEventListener("click", checkConnection);
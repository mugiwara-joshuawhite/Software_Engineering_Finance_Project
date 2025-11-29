

// Create constants links that finds all html class that uses .links
const links = document.querySelectorAll('.links')

//For each each link
links.forEach(links =>{
  //Add an event listener to each
  links.addEventListener("click",changeLinkColor)
  //Function to change the color once clicked
  function changeLinkColor(event)
  {
    event.target.style.color = "Purple";
  }

})


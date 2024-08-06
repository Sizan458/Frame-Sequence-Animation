 // put images in the canvas
 const canvas = document.querySelector("canvas")
 const Context= canvas.getContext("2d");
  //  img preloading function
  const freams = {
      currentIndex:0,
      maxIndex:479
  }

  let picesLoaded = 0;
  const images =[]
  function preloadImage(){

  for (var i=1;i<=freams.maxIndex;i++){
      const imgUrl = `/pices/frame_${i.toString().padStart(4, '0')}.jpg`
     const img = new Image()
    img.src = imgUrl
    img.onload=()=>{
     picesLoaded++

     if(picesLoaded == freams.maxIndex){
      loadimage(freams.currentIndex)
      Animation()
     }

    }
    //console.log(img)
    images.push(img)
  }
  }
  function loadimage(index){
   if(index>=0 && index<=freams.maxIndex){
     const pics =  images[index]
     //console.log(pics)
     canvas.width=window.innerWidth;
     canvas.height=window.innerHeight
     // scale image to canvas size
     const scaleX = canvas.width / pics.width;
    
     const scaleY = canvas.height/pics.height;
   const scale = Math.max(scaleX,scaleY);
   //  finding  new scale
    const newWidth = pics.width* scale;
    const newHeight = pics.height* scale;
    //  method to show img from center
    const offsetX = (canvas.width - newWidth)/2;
    const offsetY =( canvas.height - newHeight)/2; 
    // context to draw function
    Context.clearRect(0,0 ,canvas.width,canvas.height);
    Context.imageSmoothingEnabled='true';
    Context.imageSmoothingQuality="high";
    Context.drawImage(pics, offsetX, offsetY,newWidth,newHeight);
    // save  current image
    freams.currentIndex = index ;
      //console.log(canvas)
   }
  }
  // animation for loading  images CHANGE  frames by frame
   function Animation(){
  var tl = gsap.timeline({
      scrollTrigger:{
        trigger:'.nav',
        start:'top top',
        scrub:1,
       
      }
  })
  tl.to(freams,{
      currentIndex : freams.maxIndex,
      onUpdate: function (){
          loadimage(Math.floor(freams.currentIndex))
      }
  } )
   }
  preloadImage()
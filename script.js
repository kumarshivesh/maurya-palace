// <---START: `Hamburger Menu` Logic--->
const hamburger = document.querySelector('.hamburger')
const ul = document.querySelector('.header-container ul')
const iframe = document.querySelector('iframe')

hamburger.addEventListener('click', ()=> {
  ul.classList.toggle('ham_active')

  let ham_child = hamburger.firstElementChild
  if(ul.classList.contains('ham_active')) {
    ham_child.classList.replace('fa-bars', 'fa-xmark')
    // ham_child.src = "./xmark-solid.svg"; // Change the source to the xmark icon
  } else {
    ham_child.classList.replace('fa-xmark', 'fa-bars')
    // ham_child.src = "./bars-solid.svg"; // Change the source back to the bars icon
  }
})
// <---END: `Hamburger Menu` Logic--->

// <---START: `Light/Night Mode` Logic--->
const icon = document.querySelector('.fa-solid')

icon.addEventListener('click', ()=> {
  document.body.classList.toggle('dark-theme')
  if(document.body.classList.contains('dark-theme')) {
    icon.classList.replace('fa-moon', 'fa-sun')
    iframe.style.filter = 'invert(100%)' //Dark mode activation in Google Map
  } else {
    icon.classList.replace('fa-sun', 'fa-moon')
    iframe.style.filter = 'invert(0%)'  //Light mode activation in Google Map
  }
})
// <---END: `Light/Night Mode` Logic--->

// <!--START: Logic for Basic Slider-->
const slider = document.querySelector('.slider')
const left = document.querySelector('.fa-angle-left')
const right = document.querySelector('.fa-angle-right')
const images = document.querySelectorAll('.images')
console.log(images)

let slideNumber = 0

images.forEach((image, index) => {
  console.log(`Setting position for image ${index + 1}`)
  image.style.left = `${index * 100}%`
})

const nextSlide = () => {
  slideNumber++
  slideImage()
} 

const prevSlide = () => {
  slideNumber--
  slideImage()
}

const getFirstSlide = () => {
  slideNumber = 0; // Set the slideNumber to the first image index
  slideImage(); // Update the displayed image
}

const getLastSlide = () => {
  slideNumber = images.length - 1; // Set the slideNumber to the last image index
  slideImage(); // Update the displayed image
}

const slideImage = () => {
  images.forEach((image) => {
    image.style.transform = `translateX(-${slideNumber * 100}%)`
  })
}

right.addEventListener('click', ()=>{
  console.log(`Right Arrow Clicked | Current 'slideNumber' is ${slideNumber}`)
  if(slideNumber < images.length - 1) {
    nextSlide() 
  } else {
    getFirstSlide()
  }
  updateButtonStyles()
})

left.addEventListener('click', ()=>{
  console.log(`Left Arrow Clicked | Current 'slideNumber' is ${slideNumber}`)
  if(slideNumber !== 0) {
    prevSlide() 
  } else {
    getLastSlide()
  }
  updateButtonStyles()
})
// <!--END: Logic for Basic Slider-->

// <!--START: Logic for Slider Dots-->
const bottom = document.querySelector('.bottom')

for(let i = 0; i < images.length; i++) {
  const div = document.createElement('div')
  div.className = 'button'
  bottom.appendChild(div)
}

const buttons = document.querySelectorAll('.button')

buttons[0].style.backgroundColor = '#ffffff'

buttons.forEach((button, i) => {
  button.addEventListener('click', () => {
    slideNumber = i; // Update slideNumber to match the button index
    slideImage(); // Update the slider position
    updateButtonStyles(); // Update button styles to indicate active slide
  });
});

const updateButtonStyles = () => {
  buttons.forEach((button, i) => {
    if (i === slideNumber) {
      button.style.backgroundColor = '#ffffff'; // Set active button style
    } else {
      button.style.backgroundColor = ''; // Reset other buttons' styles
      button.addEventListener('mouseover', stopSlideShow) // for auto sliding 
      button.addEventListener('mouseout', startSlideShow) // for auto sliding
    }
  });
}
// <!--END: Logic for Slider Dots-->

// <!--START: Logic for Auto Sliding-->
let slideInterval

const startSlideShow = () => {
  slideInterval = setInterval(() => {
    if (slideNumber < images.length - 1) {
      nextSlide() 
    } else {
      getFirstSlide() 
    }
    updateButtonStyles()
  }, 2000)
}

const stopSlideShow = () => {
  clearInterval(slideInterval)
}

startSlideShow()

slider.addEventListener('mouseover', stopSlideShow)
slider.addEventListener('mouseout', startSlideShow)
right.addEventListener('mouseover', stopSlideShow)
right.addEventListener('mouseout', startSlideShow)
left.addEventListener('mouseover', stopSlideShow)
left.addEventListener('mouseout', startSlideShow)

// <!--END: Logic for Auto Sliding-->



